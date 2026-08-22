import residential1 from "@/assets/project-residential-1.jpg";
import residential2 from "@/assets/project-residential-2.jpg";
import commercial1 from "@/assets/project-commercial-1.jpg";
import commercial2 from "@/assets/project-commercial-2.jpg";
import interior1 from "@/assets/project-interior-1.jpg";
import interior2 from "@/assets/project-interior-2.jpg";
import renovation1 from "@/assets/project-renovation-1.jpg";

export type Category = "residential" | "commercial" | "renovation" | "interiors";

export type Project = {
  id: string;
  category: Category;
  image: string;
  title: { en: string; ne: string };
  place: { en: string; ne: string };
};

export const projects: Project[] = [
  {
    id: "p1",
    category: "residential",
    image: residential1,
    title: { en: "Bhaisepati Family Residence", ne: "भैंसेपाटी पारिवारिक निवास" },
    place: { en: "Lalitpur", ne: "ललितपुर" },
  },
  {
    id: "p2",
    category: "commercial",
    image: commercial1,
    title: { en: "Durbar Marg Office Tower", ne: "दरबारमार्ग अफिस टावर" },
    place: { en: "Kathmandu", ne: "काठमाडौं" },
  },
  {
    id: "p3",
    category: "interiors",
    image: interior1,
    title: { en: "Warm Minimal Living Room", ne: "न्यून-शैली बैठक कोठा" },
    place: { en: "Budhanilkantha", ne: "बुढानिलकण्ठ" },
  },
  {
    id: "p4",
    category: "renovation",
    image: renovation1,
    title: { en: "Heritage Brick House Revamp", ne: "परम्परागत इँटा घर सुधार" },
    place: { en: "Bhaktapur", ne: "भक्तपुर" },
  },
  {
    id: "p5",
    category: "residential",
    image: residential2,
    title: { en: "Kupondole Duplex Apartments", ne: "कुपण्डोल डुप्लेक्स अपार्टमेन्ट" },
    place: { en: "Lalitpur", ne: "ललितपुर" },
  },
  {
    id: "p6",
    category: "commercial",
    image: commercial2,
    title: { en: "Newroad Retail Hub", ne: "न्युरोड रिटेल हब" },
    place: { en: "Kathmandu", ne: "काठमाडौं" },
  },
  {
    id: "p7",
    category: "interiors",
    image: interior2,
    title: { en: "Stone & Matte Kitchen", ne: "स्टोन र म्याट किचन" },
    place: { en: "Pokhara", ne: "पोखरा" },
  },
];

export const services = [
  { key: "res", icon: "home" as const },
  { key: "com", icon: "building" as const },
  { key: "int", icon: "sofa" as const },
  { key: "ren", icon: "hammer" as const },
];

export const PHONE = "9841143264";
export const WHATSAPP_URL = "https://wa.me/9779841143264";
