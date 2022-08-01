/**
 * @jest-environment jsdom
 */
import { test, expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("render default thumbnail", async () => {
  const petComponent = render(
    <StaticRouter location={""}>
      <Pet name={""} animal={""} breed={""} images={[]} location={""} id={0} />
    </StaticRouter>
  );
  const petThumbnail = (await petComponent.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("none.jpg");
});

test("display non-default thumbnail", async () => {
  const petComponent = render(
    <StaticRouter location={""}>
      <Pet
        images={["img.jpg", "img.png"]}
        name={""}
        animal={""}
        breed={""}
        location={""}
        id={0}
      />
    </StaticRouter>
  );
  const petThumbnail = (await petComponent.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;
  expect(petThumbnail.src).toContain("img.jpg");
});
