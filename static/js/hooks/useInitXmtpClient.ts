import React, { useState, useRef, useMemo, useEffect } from "react";
import { Client, useClient, useCanMessage } from "@xmtp/react-sdk";
import { useDispatch } from "react-redux";
import { useAddress, useSigner } from "@thirdweb-dev/react";
import type { ClientOptions, Signer } from "@xmtp/react-sdk";
import type { TETHAddress } from "../helpers";
import {
  loadKeys,
  storeKeys,
  throttledFetchAddressName,
  // throttledFetchEnsAvatar,
} from "../helpers";
import { setClientAvatar, setClientName } from "../store/xmtp/xmtp.slice";

type TClientStatus = "new" | "created" | "enabled";

type TResolveReject<T = void> = (value: T | PromiseLike<T>) => void;

const makePromise = <T = void>() => {
  let reject: TResolveReject<T> = () => {};
  let resolve: TResolveReject<T> = () => {};
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return {
    promise,
    reject,
    resolve,
  };
};

const clientOptions = {
  env: "production",
} as Partial<ClientOptions>;

const useInitXmtpClient = () => {
  const walletClientRef = useRef<Signer | null>();
  const [status, setStatus] = useState<TClientStatus | undefined>();
  const [signing, setSigning] = useState(false);

  const dispatch = useDispatch();
  const walletClient = useSigner();
  const address = useAddress();

  // create promise, callback, and resolver for controlling the display of the
  // create account signature.
  const { createResolve, preCreateIdentityCallback, resolveCreate } =
    useMemo(() => {
      const { promise: createPromise, resolve } = makePromise();
      return {
        createResolve: resolve,
        preCreateIdentityCallback: () => createPromise,
        // executing this function will result in displaying the create account
        // signature prompt
        resolveCreate: () => {
          setSigning(true);
          createResolve();
        },
      };
      // if the walletClient changes during the onboarding process, reset the promise
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletClientRef.current]);

  // create promise, callback, and resolver for controlling the display of the
  // enable account signature.
  const { enableResolve, preEnableIdentityCallback, resolveEnable } =
    useMemo(() => {
      const { promise: enablePromise, resolve } = makePromise();
      return {
        enableResolve: resolve,
        // this is called right after signing the create identity signature
        preEnableIdentityCallback: () => {
          setStatus("created");
          return enablePromise;
        },
        // executing this function will result in displaying the enable account
        // signature prompt
        resolveEnable: () => {
          setSigning(true);
          enableResolve();
        },
      };
      // if the walletClient changes during the onboarding process, reset the promise
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletClientRef.current]);

  const { client, isLoading, initialize } = useClient();
  const { canMessageStatic: canMessageUser } = useCanMessage();

  useEffect(() => {
    if (!client) {
      setStatus(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initializeClient = async () => {
      if (!client && walletClient && address) {
        try {
          let keys: Uint8Array | undefined = loadKeys(address);
          if (keys) {
            // resolve client promises
            createResolve();
            enableResolve();
            // no signatures needed
            setStatus("enabled");
          } else {
            const canMessage = await canMessageUser(address, clientOptions);
            if (canMessage) {
              setStatus("created");
            } else {
              // no identity on the network
              setStatus("new");
            }
            keys = await Client.getKeys(walletClient, {
              ...clientOptions,
              skipContactPublishing: true,
              persistConversations: false,
              preCreateIdentityCallback,
              preEnableIdentityCallback,
            });
            setStatus("enabled");
            storeKeys(address, keys);
          }

          const xmtpClient = await initialize({
            keys,
            options: clientOptions,
            signer: walletClient,
          });
          if (xmtpClient) {
            const name = await throttledFetchAddressName(
              xmtpClient.address as TETHAddress
            );
            if (name) {
              const avatar = `https://effigy.im/a/${name}.svg`;
              dispatch(setClientAvatar(avatar));
              dispatch(setClientName(name));
            }
          }
        } catch (error) {
          console.log(error);
        } finally {
          setSigning(false);
        }
      }
    };

    initializeClient();
  }, [walletClientRef.current, client, address]);

  useEffect(() => {
    walletClientRef.current = walletClient;
  }, [walletClient]);

  return {
    client,
    isLoading: isLoading || signing,
    resolveCreate,
    resolveEnable,
    status,
    setStatus,
    signing,
  };
};

export default useInitXmtpClient;
