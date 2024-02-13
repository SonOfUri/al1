import styled from "styled-components";

export const OrangeBoxSC = styled.div`
  .header {
    background: var(--light-orange);
    padding: 0.5rem;
    color: var(--dark-orange);
    border-bottom: 0rem;
    margin-bottom: 0rem;
  }

  .body {
    padding: 0.5rem;
    border: 1.5px solid var(--light-orange);
  }
`;

export const BlueBoxSC = styled.div`
  .header {
    background: var(--lighter-blue);
    padding: 0.5rem;
    border: none;
    margin-bottom: 0rem;

    h4 {
      color: white;
      font-weight: 600;
      margin-bottom: 0rem;
    }
  }

  border: 1.5px solid var(--lighter-blue);

  .inner {
    padding: 0.5rem;
  }
`;

export const ProfilePageSC = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  padding: 0rem 1rem;

  .section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const BioSC = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    font-weight: 500;
  }

  .profile-info {
    display: flex;
    gap: 1rem;

    img {
      max-width: 200px;
      height: 100%;
    }
  }

  h5 {
    font-weight: 500;
    font-size: 1rem;
  }

  .bio-summary {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    img {
      height: 2rem;
    }
  }
`;

export const ProfileAboutSC = styled(OrangeBoxSC)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .summary-box {
    border: 2px solid black;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    font-size: 1.25rem;
  }
  .about-content {
    border: 1px solid var(--light-orange);

    .body {
      padding: 0.5rem;
      border: 1px solid var(--light-orange);

      h4 {
        color: var(--dark-orange);
        margin-bottom: 0.5rem;
      }

      p {
        margin: 0.5rem 0rem;
      }
    }
  }
`;

export const ProfileFrensSC = styled(OrangeBoxSC)`
  .body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const ProfileLinksSC = styled(BlueBoxSC)`
  .inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;

    .link-item {
      display: flex;
      gap: 0.5rem;
      align-items: center;

      img {
        height: 1.25rem;
      }
    }
  }
`;

export const InterestsSC = styled(BlueBoxSC)`
  .inner {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .interest-item {
    display: grid;
    grid-template-columns: 0.6fr 1fr;
    gap: 0.5rem;

    .category,
    .category-data {
      padding: 0.5rem;
      display: flex;
      align-items: flex-start;
    }

    .category {
      background: var(--even-lighter-blue);
      width: 100%;
    }

    .category-data {
      background: var(--lightest-blue);
    }

    h3 {
      font-size: 0.9rem;
      color: var(--light-blue);
      font-weight: 600;
    }

    p,
    h3 {
      margin: 0rem;
    }
  }
`;
