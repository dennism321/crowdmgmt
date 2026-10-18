import w01 from "@/assets/work/work-01.webp";
import w02 from "@/assets/work/work-02.webp";
import w03 from "@/assets/work/work-03.webp";
import w04 from "@/assets/work/work-04.webp";
import w05 from "@/assets/work/work-05.webp";
import w06 from "@/assets/work/work-06.webp";
import w07 from "@/assets/work/work-07.webp";
import w08 from "@/assets/work/work-08.webp";
import w09 from "@/assets/work/work-09.webp";
import w10 from "@/assets/work/work-10.webp";
import w11 from "@/assets/work/work-11.webp";
import w12 from "@/assets/work/work-12.webp";
import w13 from "@/assets/work/work-13.webp";
import w14 from "@/assets/work/work-14.webp";
import w15 from "@/assets/work/work-15.webp";
import w17 from "@/assets/work/work-17.webp";
import w18 from "@/assets/work/work-18.webp";
import w19 from "@/assets/work/work-19.webp";
import w20 from "@/assets/work/work-20.webp";
import w21 from "@/assets/work/work-21.webp";
import w22 from "@/assets/work/work-22.webp";
import w23 from "@/assets/work/work-23.webp";
import w24 from "@/assets/work/work-24.webp";
import w25 from "@/assets/work/work-25.webp";
import w26 from "@/assets/work/work-26.webp";
import w27 from "@/assets/work/work-27.webp";
import w28 from "@/assets/work/work-28.webp";

export type WorkCategory =
  | "Makeup"
  | "Hair"
  | "Grooming"
  | "Photography"
  | "Creative Direction"
  | "Campaign"
  | "Talent";

export type WorkItem = {
  id: string;
  src: string;
  title: string;
  credit: string;
  category: WorkCategory;
  link: string;
};

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

/** Imagery from the crowdMGMT.com homepage feed (#BrandsInGoodHands). */
export const work: WorkItem[] = [
  { id: "w01", src: w01, title: "Ciara — Junya Watanabe Show", credit: "Makeup by Yolonda Frederick-Thompson", category: "Makeup", link: ig("Dec3Jt3jJCA") },
  { id: "w06", src: w06, title: "Travis Scott — L’Officiel Italia Cover", credit: "Grooming by Merrell Hollis", category: "Grooming", link: ig("Dad9h2iCdwR") },
  { id: "w03", src: w03, title: "Ariana Grande — “PETAL” Music Video", credit: "Custom color by Brandon Pietsch", category: "Hair", link: ig("DczfFuTjI-X") },
  { id: "w05", src: w05, title: "Mary J. Blige — Las Vegas Residency", credit: "Makeup by Merrell Hollis", category: "Makeup", link: ig("DbWpHRSiW2-") },
  { id: "w14", src: w14, title: "Jon Batiste — 2026 Met Gala", credit: "Grooming by Madge Earle", category: "Grooming", link: ig("DX_5CwzEb_g") },
  { id: "w15", src: w15, title: "Ciara — 2026 Met Gala Carpet", credit: "Makeup by Yolonda Frederick-Thompson with Rodan + Fields", category: "Makeup", link: ig("DX_yv0yEV0m") },
  { id: "w09", src: w09, title: "Jessica Divine — Glamour Bulgaria Cover", credit: "Hair & Makeup by T. Cooper", category: "Makeup", link: ig("DZtB70AiUOA") },
  { id: "w04", src: w04, title: "“Jesus & Whiskey” Album Cover Art", credit: "Creative Direction by Simone Tisci · Executive Produced by EJ Jamele", category: "Creative Direction", link: ig("DbbxBxLiRrt") },
  { id: "w25", src: w25, title: "Taraji P. Henson — Seven Daughters Wine", credit: "Photography by James Anthony", category: "Photography", link: ig("DURfKTsia-m") },
  { id: "w02", src: w02, title: "Julez Smith for UGG", credit: "Grooming by Madge Earle", category: "Grooming", link: ig("DdpaWsaibP2") },
  { id: "w12", src: w12, title: "Ciara — tmrw Magazine Cover", credit: "Makeup by Yolonda Frederick-Thompson", category: "Makeup", link: ig("DYYBKQLJ2uz") },
  { id: "w13", src: w13, title: "Mary J. Blige — Las Vegas Magazine", credit: "Creative Direction + Makeup by Merrell Hollis", category: "Creative Direction", link: ig("DYXyhRLiRq0") },
  { id: "w17", src: w17, title: "Taylor Momsen — TMRW Magazine", credit: "Hair by Brandon Pietsch", category: "Hair", link: ig("DW7VQfACTK7") },
  { id: "w20", src: w20, title: "Ghost Bond × Kellon Deryck Campaign", credit: "Directed & photographed by Derek Blanks with crowdMGMT + Productions", category: "Campaign", link: ig("DVKMQrsjGY3") },
  { id: "w18", src: w18, title: "Ciara — Vanity Fair Oscar Party", credit: "Makeup by Yolonda Frederick-Thompson", category: "Makeup", link: ig("DWFRgL7sE5I") },
  { id: "w28", src: w28, title: "Niecy Nash-Betts — Air Jordan 6 “Genie”", credit: "Makeup by Naima Jamal for Jumpman", category: "Makeup", link: ig("DUCJJX1DWyl") },
  { id: "w10", src: w10, title: "Ariana Grande — Bold Lowlights", credit: "Custom color by Brandon Pietsch", category: "Hair", link: ig("DZI8calia7O") },
  { id: "w21", src: w21, title: "Ne-Yo — Rolling Stone Korea", credit: "Grooming by Merrell Hollis", category: "Grooming", link: ig("DU9QGtnCVPX") },
  { id: "w19", src: w19, title: "Sophia Bush", credit: "Hair by Gabi Lopez", category: "Hair", link: ig("DVevzPvCbwr") },
  { id: "w07", src: w07, title: "Eva’s Hair Transformation Moment", credit: "Photography by James Anthony", category: "Photography", link: ig("DaRGKXyidV2") },
  { id: "w26", src: w26, title: "Yahya Abdul-Mateen II — The Sherri Show", credit: "Grooming by Merrell Hollis", category: "Grooming", link: ig("DUHO-PKDMuq") },
  { id: "w08", src: w08, title: "Ciara — Surprise Appearance with Russell Wilson", credit: "Makeup by Yolonda Frederick-Thompson", category: "Makeup", link: ig("DaDSmphkclH") },
  { id: "w11", src: w11, title: "Mary J. Blige — Residency Glam", credit: "Creative Direction & Makeup by Merrell Hollis", category: "Creative Direction", link: ig("DY28yYqJlo-") },
  { id: "w22", src: w22, title: "Brandon Pietsch × L’Oréal Pro", credit: "Revealed as a L’Oréal Pro Global Creative Contributor", category: "Talent", link: ig("DU1jC8sjafL") },
  { id: "w27", src: w27, title: "Ciara — The Jennifer Hudson Show", credit: "Makeup by Yolonda Frederick-Thompson", category: "Makeup", link: ig("DUEpDgjjELB") },
  { id: "w23", src: w23, title: "Morning Mindset with Tai × PATTERN Beauty", credit: "Client Tai Beauchamp hosts a Valentine’s Day wellness retreat with H&M", category: "Talent", link: ig("DUb8WEgjEc2") },
  { id: "w24", src: w24, title: "Naima Jamal — Hollywood Beauty Awards", credit: "Nominated for the HBA ZM Makeup Award", category: "Talent", link: ig("DUTqQB9iULg") },
];

export const workById = Object.fromEntries(work.map((w) => [w.id, w])) as Record<string, WorkItem>;
