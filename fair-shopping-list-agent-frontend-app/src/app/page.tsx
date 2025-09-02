import Footer from "@/components/elements/footer";
import { Header } from "@/components/elements/header";
import { ItemCard } from "@/components/elements/item-card";
import { ShoppingForm } from "@/components/elements/shopping-form";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header />
    <ShoppingForm />
    {/* <ItemCard item={{ id: "1", name: "Sample Item", price: 9.99 }} /> */}
    {/* <Footer /> */}
    </>
  );
}
