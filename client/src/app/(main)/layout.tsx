import Navber from "@/components/Navber";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navber />
      {children}
      <Footer />
    </>
  );
}