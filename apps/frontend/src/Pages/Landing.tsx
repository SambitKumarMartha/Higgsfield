import { Video } from "@/components/video";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const video = [
  {
    url: "https://cdn.higgsfield.ai/card/16eebc9a-8310-4f68-8a02-1e2e6f109169.mp4",
    title: "BUILD YOUR VIDEO",
  },

  {
    url: "https://static-public-media.higgsfield.ai/cards/33cd35c5-e687-46cd-8fa5-2d097d4206dc.mp4",
    title: "TURN YOUR IDEAS INTO FILM",
  },

  {
    url: "https://static-public-media.higgsfield.ai/cards/631b6f85-97e5-4bd1-b59c-54e70fe8a183.mp4",
    title: "PROJECT YOUR MIND",
  },
  {
    url: "https://static-public-media.higgsfield.ai/cards/30d10c8a-64f1-48ac-ab44-7656ba8b75a4.mp4",
    title: "MAKE YOUR UNIQ MIX",
  },
  {
    url: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    title: "LIVE YOUR IDEA",
  },
  {
    url: "https://static-public-media.higgsfield.ai/cards/4c2bb5a7-ba39-464d-be1d-01de1c52dcaf.mp4",
    title: "NFSNFJNF",
  },
  {
    url: "https://static-public-media.higgsfield.ai/cards/f3354df7-9f8c-4b63-82af-2c69cb780b7a.mp4",
    title: "FHGHJFVBB",
  },
  {
    url: "https://static-public-media.higgsfield.ai/cards/19876d64-4312-4bc7-bdf5-98f41a2336ab.mp4",
    title: "FHUFHIDSH",
  },
];

export function LandingPage() {
  return (
    <div className="pt-6 px-14">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {video.map((V) => (
            <CarouselItem key={V.url} className="basis-full basis-1/2 lg:basis-1/3">
              <Video url={V.url} title={V.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
