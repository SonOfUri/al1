import styled from "styled-components";

export const TeamProfilesSC = styled.div`
  background: var(--gray);

  h4 {
    font-size: 1.2rem;
  }

  .inner-content {
    background: white;
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    height: 100%;
    margin-bottom: 4rem;
  }

  .team-profiles {
    border: 1.5px solid var(--light-orange);
    .profiles-header {
      background: var(--light-orange);
      padding: 0.5rem;
      h4 {
        font-size: 1.2rem;
        color: var(--black);
      }
    }
  }

  .profiles {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const ProfileCardSC = styled.div`
  cursor: pointer;

  button {
    margin-top: 0.5rem;
  }

  width: 100%;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: 50% 0%;
  }

  color: #1a3bb6;
`;

export const MyFrensHeaderSC = styled.div`
  .brand-banner {
    background: var(--darker-blue);
    padding: 1rem;
    color: white;

    svg {
      opacity: 1;
      fill: white;
      height: 50px;
    }
  }

  .links-banner {
    background: var(--lighter-blue);
    padding: 0.5rem 1rem;
    display: flex;
    gap: 0.5rem;

    @media (max-width: 800px) {
      .team-member {
        display: none;
      }
    }

    div {
      border-right: 1.5px solid var(--darker-blue);
    }

    button {
      background: none;
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;

      &:hover {
        box-shadow: none;
        text-decoration: underline;
      }
    }
  }
`;

export const MyFrensFooterSC = styled.div`
  background: var(--darker-blue);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

export const SocialPostsSC = styled.div`
  .posts__header {
    padding: 0.5rem;
    background: linear-gradient(
      180deg,
      var(--even-lighter-blue) 0%,
      rgba(132, 166, 255, 0) 100%
    );
  }
  .posts__body {
    padding: 1rem;
  }
`;

export const MyFrensHomeSC = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
