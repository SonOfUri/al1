import styled from "styled-components";

export const PepeOSTourSC = styled.div`
  font-family: "Franklin Gothic Medium", "Tahoma";
  overflow: scroll;
  height: 100%;

  .tour_container {
    background-color: rgba(255, 255, 255, 1);
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    justify-content: space-between;
    padding: 3rem 3rem 1rem 3rem;

    @media (max-width: 800px) {
      padding: 2rem;
    }
  }

  .tour_content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: 0 auto;
    gap: 2rem;
    max-width: 1000px;

    button {
      background: none;
      border: none;
      font-family: "Franklin Gothic Book", "Tahoma";
      font-weight: 600;
      padding: 0px;
      cursor: pointer;

      &:hover {
        border: none;
        box-shadow: none;
      }
    }

    @media (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }

  .intro_body {
    font-family: "Franklin Gothic Book", "Tahoma";
    font-size: 1rem;
    line-height: 175%;
    color: #808080;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    a {
      font-size: 1rem;
    }

    @media (max-width: 800px) {
      font-size: 0.9rem;
      line-height: 150%;

      a {
        font-size: 0.7rem !important;
      }
    }

    img {
      width: 100%;
      max-width: 300px;
    }
  }

  .nav {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav_title {
    font-size: 14pt;
    text-decoration: none;
  }

  footer {
    text-align: center;
    font-size: 0.8rem;
    color: #808080;
    margin-top: 2rem;
  }

  p {
    font-size: 0.8rem;
    color: #808080;
    margin-top: 10px;
    margin-bottom: 10px;

    @media (max-width: 800px) {
      font-size: 0.75rem;
    }
  }

  img {
    vertical-align: bottom;
    margin-right: 10px;
    width: 40px;
    height: auto;

    @media (max-width: 800px) {
      width: 2rem;
    }
  }

  a {
    font-family: "Franklin Gothic Book", "Tahoma";
    font-weight: 600;
  }

  #start_here {
    color: #808080;
  }

  #safe_easy {
    color: #ff4600;
  }

  #unlock {
    color: #54aa2b;
  }

  #connected {
    color: #495ad1;
  }

  #best {
    color: #d29b00;
  }

  #uniswap {
    color: #ff007a;
  }
`;
