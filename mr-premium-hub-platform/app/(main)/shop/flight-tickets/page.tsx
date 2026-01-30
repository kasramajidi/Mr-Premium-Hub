import { redirect } from "next/navigation";

export const metadata = {
  title: "خرید بلیط پرواز خارجی | فروشگاه مستر پریمیوم هاب",
  description:
    "رزرو و خرید بلیط هواپیما خارجی از وبسایت‌های معتبر؛ لیست سایت‌ها، نحوه خرید آنلاین و ریفاند. مستر پریمیوم هاب.",
};

export default function FlightTicketsPage() {
  redirect("/shop/product/11");
}
