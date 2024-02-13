import styled from "styled-components";

export const HomePageSC = styled.div`
  background: white;
  width: 100%;
  min-height: 100%;
  height: 100%;

  .header {
    border-bottom: 1px solid black;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
      max-height: 80px;
      image {
        opacity: 1 !important;
      }
    }

    @media only screen and (max-width: 800px) {
      justify-content: center;
      svg {
        max-height: 100px;
        width: 100%;
      }
    }
  }

  .main-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    height: 100%;

    .nav {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .nav-item {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        font-size: 1.2rem;
        align-items: center;

        img {
          height: 32px;
        }
      }
    }

    @media (max-width: 800px) {
      img {
        max-width: 100%;
      }
      h2 {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }
      h3 {
        font-size: 1.5rem;
      }

      .contract {
        font-size: 14px;
      }
      grid-template-columns: 1fr;
      .nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 100%;

        .nav-item {
          border: none;
        }
      }
    }
  }

  .buy-now {
    transition: 0.3s;
    &:hover {
      filter: saturate(2);
    }
  }

  p {
    margin: 1rem 0rem;
  }
`;
