"use client";

import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity/lib/createClient";
import { useLayoutEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import linkArrow from "../assets/icons/link-arrow.svg";

const StyledContainer = styled.section`
  padding-bottom: 244px;
  @media ${({ theme }) => theme.minWidth.md} {
    padding-bottom: 153px;
  }
`;

const StyledIllustrationsBlock = styled.div`
  display: block !important;
  @media ${({ theme }) => theme.minWidth.md} {
    display: grid !important;
  }
`;
const StyledIllustration = styled.div`
  margin-bottom: 120px;
  @media ${({ theme }) => theme.minWidth.md} {
    margin-bottom: 0;
    grid-column: ${({ $position }) =>
      $position.columnStart + "/" + ($position.columnEnd + 1)};
    grid-row: ${({ $position }) => $position.rowStart + "/" + $position.rowEnd};
  }
  &:hover,
  &.touch {
    .gifImage {
      opacity: 1;
    }
  }
  a {
    position: relative;
  }
  img {
    width: 100%;
    height: auto;
    &.gifImage {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .see-btn {
    display: flex;
    text-transform: uppercase;
    font-size: 12px;
    margin-top: 15px;
    img {
      width: auto;
    }
    @media ${({ theme }) => theme.minWidth.md} {
      display: none;
    }
  }
`;

export default function Illustrations({ illustrations }) {
  const router = useRouter();

  const handleTouchStart = (e) => {
    const currentTarget = e.currentTarget;
    currentTarget.classList.toggle("touch");
  };

  useLayoutEffect(() => {
    if (router.query.scrollPosition) {
      window.scrollTo(0, router.query.scrollPosition);
    }
  }, [router.query.scrollPosition]);

  return (
    <StyledContainer>
      {illustrations.map((illustrationsBlock) => {
        return (
          <StyledIllustrationsBlock
            className="grid"
            key={illustrationsBlock.id}
          >
            {illustrationsBlock.illustrations.map((illustration) => {
              const { title, mainImage, gifImage, slug, position } =
                illustration;
              const mainImageProps = useNextSanityImage(
                sanityClient,
                mainImage
              );
              const gifImageProps = useNextSanityImage(sanityClient, gifImage);
              return (
                <StyledIllustration
                  $position={position}
                  key={title}
                  onTouchStart={() => handleTouchStart}
                >
                  <Link
                    href={`/illustration/${slug.current}`}
                    scroll={false}
                    shallow={true}
                  >
                    <Image {...mainImageProps} alt={title} sizes="100vw" />
                    <Image
                      {...gifImageProps}
                      alt={title}
                      sizes="100vw"
                      className="gifImage"
                    />
                    <div className="see-btn">
                      Voir&nbsp;
                      <Image
                        src={linkArrow}
                        alt="Commander"
                        width={10}
                        height={10}
                      />
                    </div>
                  </Link>
                </StyledIllustration>
              );
            })}
          </StyledIllustrationsBlock>
        );
      })}
    </StyledContainer>
  );
}
