import Image from "next/image";
import styled from "styled-components";
import signature from "@/assets/imgs/signature.jpeg";
import signatureGif from "@/assets/imgs/signature.gif";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/app/Context";

const StyledContainer = styled.section`
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  padding: 15px;
  box-sizing: border-box;
  position: fixed;
  transition: all 0.8s ${({ theme }) => theme.cubicBezier.pageTranstion};
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: white;
  display: ${({ $isIntroTransition, $isFullPage }) =>
    $isIntroTransition || $isFullPage ? "block" : "grid"};
  height: ${({ $screenHeight, $isFullPage, $isMinimized }) =>
    $isFullPage ? $screenHeight : $isMinimized ? 60 : 270}px;
  @media ${({ theme }) => theme.minWidth.md} {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 30px;
    padding: ${({ $isMinimized }) => ($isMinimized ? "15px 30px" : "30px")};
    height: ${({ $screenHeight, $isFullPage, $isMinimized }) =>
      $isFullPage ? $screenHeight : $isMinimized ? 60 : 153}px;
  }
  span {
    height: 45px;
    @media ${({ theme }) => theme.minWidth.md} {
      display: none;
    }
  }
  .signature {
    transition: all 0.8s ${({ theme }) => theme.cubicBezier.pageTranstion};
    position: absolute;
    bottom: ${({ $isFullPage, $isMinimized }) =>
      $isFullPage ? "calc(50% - 50px)" : $isMinimized ? "12px" : "215px"};
    left: ${({ $isFullPage }) =>
      $isFullPage ? "calc(50% - 150px)" : "calc(50% - 90px)"};
    width: 300px;
    @media ${({ theme }) => theme.minWidth.md} {
      width: 600px;
      left: ${({ $isFullPage }) =>
        $isFullPage ? "calc(50% - 300px)" : "30px"};
      bottom: ${({ $isFullPage, $isMinimized }) =>
        $isFullPage ? "calc(50% - 50px)" : $isMinimized ? "8px" : "30px"};
    }
    .img {
      transition: all 0.8s ${({ theme }) => theme.cubicBezier.pageTranstion};
      height: auto;
      width: 170px;
      @media ${({ theme }) => theme.minWidth.md} {
        position: relative;
        top: unset;
        width: ${({ $isMinimized }) => ($isMinimized ? 170 : 370)}px;
      }
    }
    .gif {
      width: 100%;
      height: auto;
    }
  }
  & > div {
    position: ${({ $isFullPage, $isIntroTransition }) =>
      $isFullPage || $isIntroTransition ? "absolute" : "relative"};
    transition: opacity 0.4s;
    opacity: ${({ $isFullPage, $isMinimized, $isIntroTransition }) =>
      $isFullPage || $isMinimized || $isIntroTransition ? 0 : 1};
    line-height: 18px;
  }
  h2 {
    text-transform: uppercase;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
    @media ${({ theme }) => theme.minWidth.md} {
      font-size: 16px;
      line-height: 20px;
    }
  }
  a:hover {
    text-decoration: underline;
  }
  .expos {
    grid-column: 1 / 2;
    @media ${({ theme }) => theme.minWidth.md} {
      grid-column: 4 / 5;
    }
  }
  .adresse {
    grid-column: 1 / 2;
    @media ${({ theme }) => theme.minWidth.md} {
      grid-column: 5 / 6;
    }
  }
  .contact {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    text-align: end;
    @media ${({ theme }) => theme.minWidth.md} {
      grid-column: 6 / 7;
      grid-row: auto;
      text-align: left;
    }
    .email-mobile {
      @media ${({ theme }) => theme.minWidth.md} {
        display: none;
      }
    }
    .email-desktop {
      display: none;
      @media ${({ theme }) => theme.minWidth.md} {
        display: block;
      }
    }
  }
  .credits {
    align-self: flex-end;
    grid-column: 2 / 3;
    font-size: 10px;
    text-align: end;
    @media ${({ theme }) => theme.minWidth.md} {
      padding-top: 30px;
      grid-column: 7 / 8;
      font-size: 12px;
      text-align: left;
    }
    .credits-links {
      font-size: 9px;
      display: flex;
      flex-wrap: wrap;
      justify-content: end;
      @media ${({ theme }) => theme.minWidth.md} {
        justify-content: start;
        font-size: 10px;
      }
    }
  }
`;

export default function HomeFooter({ events, inModal }) {
  const [screenHeight, setScreenHeight] = useState();
  const [scrollY, setScrollY] = useState(0);
  const [isIntroTransition, setIsIntroTransition] = useState(false);
  const {
    isFooterMinimized,
    setIsFooterMinimized,
    isLandingIntro,
    setIsLandingIntro,
  } = useContext(Context);

  useEffect(() => {
    const screenHeight = window.innerHeight;
    setScreenHeight(screenHeight);
  }, []);

  useEffect(() => {
    isLandingIntro
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "scroll");
  }, [isLandingIntro]);

  useEffect(() => {
    if (inModal) {
      setIsIntroTransition(false);
      setIsLandingIntro(false);
    } else {
      setTimeout(() => {
        setIsLandingIntro(false);
        setIsIntroTransition(true);
        setTimeout(() => {
          setIsIntroTransition(false);
        }, 800);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const handleIsMinimized = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY || currentScrollY < scrollY) {
        setIsFooterMinimized(true);
      }
      const isScrollToBottom =
        window.innerHeight + currentScrollY >= document.body.offsetHeight;
      if (currentScrollY === 0 || isScrollToBottom) {
        setIsFooterMinimized(false);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleIsMinimized);
    return () => {
      window.removeEventListener("scroll", handleIsMinimized);
    };
  }, [scrollY]);

  function handleTouch() {
    setIsFooterMinimized(!isFooterMinimized);
  }

  if (screenHeight)
    return (
      <StyledContainer
        $isMinimized={isFooterMinimized}
        $isFullPage={isLandingIntro}
        $isIntroTransition={isIntroTransition}
        $screenHeight={screenHeight}
        onTouchStart={() => handleTouch()}
        onMouseEnter={() => setIsFooterMinimized(false)}
        onMouseLeave={() => setIsFooterMinimized(true)}
      >
        <aside className="signature">
          {isLandingIntro ? (
            <Image
              src={signatureGif}
              width={600}
              alt="Signature Bruce d'Anis"
              priority={true}
              className="gif"
            />
          ) : (
            <>
              <Image
                className="img"
                src={signature}
                width={600}
                alt="Signature Bruce d'Anis"
              />
            </>
          )}
        </aside>
        <span></span>
        {events.length > 0 && (
          <div className="expos">
            <h2>Expos en cours</h2>
            {events.map((event, index) => (
              <a key={index} href={event.href}>
                {event.title}
              </a>
            ))}
          </div>
        )}
        <div className="adresse">
          <h2>Adresse</h2>
          <a href="https://www.google.fr/maps/place/47+Rue+Jean+de+Bernardy,+13001+Marseille/@43.3027856,5.386779,1212m/data=!3m2!1e3!4b1!4m6!3m5!1s0x12c9c09ec8095aa5:0xcb659763fe0dcb81!8m2!3d43.3027856!4d5.3893539!16s%2Fg%2F11c4h31qlk?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D">
            Atelier Algue
            <br />
            47 rue Jean de Bernardy <br />
            13001, Marseille
          </a>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          <a href="tel:+33752928244">07 52 92 82 44</a>
          <a href="mailto:brucedanis.illustrations@gmail.com">
            <div className="email-mobile">E-mail</div>
            <div className="email-desktop">
              brucedanis.illustrations@gmail.com
            </div>
          </a>
          <a href="https://www.instagram.com/brucedanis.illustrations">
            @brucedanis
          </a>
        </div>
        <div className="credits">
          <p>© 2024 Bruce d’Anis</p>
          <p className="credits-links">
            Réalisé par&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://clementlapasset.dev/"
            >
              Clément
            </a>
            &nbsp;et&nbsp;
            <a target="_blank" rel="noreferrer" href="https://alapasset.dev/">
              Adrien Lapasset
            </a>
          </p>
        </div>
      </StyledContainer>
    );
}
