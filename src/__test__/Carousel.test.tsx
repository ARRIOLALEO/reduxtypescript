/**
 * @jest-environment jsdom
 */
import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("customer can click on thumbnails and they will show on hero", async () => {
  const images = ["img.jpg", "img.png", "img.web"];
  const carouselComponent = render(<Carousel images={images} />);
  const hero = (await carouselComponent.findByTestId(
    "hero"
  )) as HTMLImageElement;
  expect(hero.src).toContain("img.jpg");

  for (let index = 0; index < images.length; index++) {
    const image = images[index];
    const thumbnail = await carouselComponent.findByTestId(
      `thumbnails${index}`
    );
    thumbnail.click();
    expect(hero.src).toContain(image);
  }
});
