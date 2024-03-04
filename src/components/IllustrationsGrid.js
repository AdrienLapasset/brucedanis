import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import sanityClient from "../../sanity/lib/createClient";
import { useLayoutEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

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
                    <Image
                      {...mainImageProps}
                      alt={title}
                      sizes="(max-width: 800px) 100vw, 800px"
                    />
                    <Image
                      {...gifImageProps}
                      alt={title}
                      sizes="(max-width: 800px) 100vw, 800px"
                      className="gifImage"
                    />
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
