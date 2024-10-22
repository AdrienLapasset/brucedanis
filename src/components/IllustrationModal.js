import styled from "styled-components";
import sanityClient from "../../sanity/lib/createClient";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { useRouter } from "next/router";
import PrevArrow from "../assets/icons/ArrowLeft";
import NextArrow from "../assets/icons/ArrowRight";
import CloseBtn from "../assets/icons/CloseBtn";
import linkArrow from "../assets/icons/link-arrow.svg";
import { useEffect, useRef, useState } from "react";

const StyledContainer = styled.section`
  z-index: 1;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: all 0.4s;
  @media ${({ theme }) => theme.minWidth.md} {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal {
    display: block;
    background-color: white;
    margin: 45px 0;
    padding: 0 30px;
    height: ${({ $isArrows }) =>
      $isArrows ? "calc(100vh - 90px)" : "calc(100vh - 45px)"};
    overflow-y: scroll;
    @media ${({ theme }) => theme.minWidth.md} {
      padding: 0 0 0 30px;
      display: grid;
      margin: 90px;
      height: calc(100vh - 180px);
    }
    .close-btn {
      position: absolute;
      top: 15px;
      right: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        top: 30px;
        right: 30px;
      }
      path {
        stroke: black;
        @media ${({ theme }) => theme.minWidth.md} {
          stroke: white;
        }
      }
    }
    .main-image {
      padding: 0 0 30px;
      opacity: ${({ $isTransition }) => ($isTransition ? 0 : 1)};
      transition: opacity 0.2s;
      max-height: calc(100vh - 280px);
      height: auto;
      max-width: 100%;
      object-fit: contain;
      margin: 0 auto;
      display: block;
      @media ${({ theme }) => theme.minWidth.md} {
        max-width: 100%;
        grid-column: 1 / 6;
        align-self: center;
        max-height: calc(100vh - 260px);
        padding: 30px 0;
      }
    }
    .infosPanel {
      padding: 0 30px 90px 0;
      @media ${({ theme }) => theme.minWidth.md} {
        overflow-y: scroll;
        grid-column: 6 / 8;
        display: flex;
        flex-direction: column;
        padding: 60px 30px 30px 0;
        align-items: flex-start;
      }
      .title-image {
        padding-bottom: 15px;
        height: 50px;
        width: auto;
        max-width: 100%;
        object-fit: contain;
        @media ${({ theme }) => theme.minWidth.md} {
          padding-bottom: 30px;
          height: 80px;
        }
      }
      .info-container {
        grid-column: 1 / 3;
        font-size: 14px;
        > * + * {
          margin-top: 7px;
        }
      }
      .description {
        font-size: 14px;
        font-style: italic;
        padding-top: 15px;
        @media ${({ theme }) => theme.minWidth.md} {
          padding-top: 30px;
        }
      }
      .buy-btn {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        margin: 30px 0 5px;
        @media ${({ theme }) => theme.minWidth.md} {
          margin: 30px 0 5px;
        }
      }
      .vacation-notice {
        font-size: 12px;
        line-height: 15px;
      }
      .format-title {
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: normal;
        margin: 30px 0 15px;
        @media ${({ theme }) => theme.minWidth.md} {
          margin: 45px 0 15px;
        }
      }
      .formats {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
        width: 100%;
      }
    }
    .prevArrow,
    .nextArrow {
      position: absolute;
      bottom: 0;
      width: 50vw;
      height: 45px;
      display: flex;
      align-items: center;
      background-color: white;
      @media ${({ theme }) => theme.minWidth.md} {
        top: 50%;
        bottom: 50%;
        width: 90px;
        height: 90px;
        display: block;
        background-color: transparent;
      }
    }
    .prevArrow {
      left: 0;
      justify-content: flex-start;
      padding-left: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        padding-left: 0;
      }
    }
    .nextArrow {
      right: 0;
      justify-content: flex-end;
      padding-right: 30px;
      @media ${({ theme }) => theme.minWidth.md} {
        padding-right: 0px;
      }
    }
    svg {
      path {
        fill: black;
        @media ${({ theme }) => theme.minWidth.md} {
          fill: white;
        }
      }
    }
  }
`;
const StyledFormat = styled.div`
  justify-self: start;
  cursor: pointer;
  p {
    text-decoration: ${({ $isSelected }) => $isSelected && "underline"};
    text-decoration-thickness: 2px;
    text-underline-offset: 8px;
  }
`;

export default function IllustrationModal({ illustration, vacation }) {
  const { formats, titleImage, categoryCount, title, description } =
    illustration;

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const modalRef = useRef();
  const infoRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = "hidden";
    }, 100);
    setIsVisible(true);
    // Outside click to close
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleQuitModal();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    setSelectedFormat(formats[0]);
  }, [formats]);

  // Let the exit animation before component is unmount
  function handleQuitModal() {
    setIsVisible(false);
    setTimeout(() => {
      router.push(
        {
          pathname: "/",
          query: { scrollPosition: document.documentElement.scrollTop },
        },
        "/",
        { scroll: false, shallow: true }
      );
    }, 400);
  }
  const mainImageProps = useNextSanityImage(
    sanityClient,
    selectedFormat?.image
  );
  const titleImageProps = useNextSanityImage(sanityClient, titleImage);

  function handlePush(target) {
    router
      .push(`/illustration/${target.slug}`, undefined, { scroll: false })
      .then(() => {
        setIsTransition(false);
      });
  }

  function handlePrevBtn() {
    if (illustration.prev !== null) {
      handlePush(illustration.prev);
    } else {
      handlePush(illustration.last);
    }
  }

  function handleNextBtn() {
    // setIsTransition(true);
    // setTimeout(() => {
    if (illustration.next !== null) {
      handlePush(illustration.next);
    } else {
      handlePush(illustration.first);
    }
    // }, 200);
  }

  // Force scroll up on page change
  useEffect(() => {
    if (infoRef.current) {
      infoRef.current.scrollTop = 0;
    }
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [router.asPath]);

  return (
    <StyledContainer
      $isVisible={isVisible}
      $isTransition={isTransition}
      $isArrows={categoryCount > 1}
    >
      <div className="modal grid" ref={modalRef}>
        <button className="close-btn" onClick={() => handleQuitModal()}>
          <CloseBtn />
        </button>
        <Image
          {...mainImageProps}
          className="main-image"
          alt={title}
          sizes="(max-width: 800px) 100vw, calc(100vw - 500px)"
        />
        <section className="infosPanel" ref={infoRef}>
          <Image
            {...titleImageProps}
            className="title-image"
            alt={title}
            sizes="(max-width: 800px) 100vw, 400px"
          />
          <div className="info-container">
            <div>{selectedFormat?.technique}</div>
            <div>{selectedFormat?.dimensions}</div>
            <div>{selectedFormat?.price}&nbsp;€</div>
          </div>
          <div className="description">{description}</div>
          {illustration.soldOut ? (
            <div className="buy-btn">Épuisé</div>
          ) : (
            <a
              className="buy-btn"
              href={selectedFormat?.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Commander&nbsp;
              <Image src={linkArrow} alt="Commander" width={10} height={10} />
            </a>
          )}
          {vacation && <p className="vacation-notice">{vacation[0]?.text}</p>}
          {formats.length > 1 && (
            <>
              <h2 className="format-title">Autres formats</h2>
              <div className="formats">
                {formats.map((format, index) => {
                  const isSelected =
                    format.dimensions === selectedFormat?.dimensions;
                  return (
                    <StyledFormat
                      className="format"
                      key={index}
                      $isSelected={isSelected}
                      onClick={() => setSelectedFormat(format)}
                    >
                      <Image
                        src={format.image.asset.url}
                        alt={`Format ${index}`}
                        width={200}
                        height={200}
                        style={{
                          width: "100%",
                          objectFit: "contain",
                          maxHeight: "100px",
                        }}
                      />
                      <p>{format.dimensions}</p>
                    </StyledFormat>
                  );
                })}
              </div>
            </>
          )}
        </section>
        {categoryCount > 1 && (
          <>
            <button className="prevArrow" onClick={() => handlePrevBtn()}>
              <PrevArrow />
            </button>
            <button className="nextArrow" onClick={() => handleNextBtn()}>
              <NextArrow />
            </button>
          </>
        )}
      </div>
    </StyledContainer>
  );
}
