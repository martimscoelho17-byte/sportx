import { db } from "./server/db.ts";
import { products } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

const imageUpdates = [
  // Nike Mercurial
  { name: 'Nike Mercurial Vapor 16 Elite FG "Kylian Mbappé"', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/V8y2s8bi0f5a_dfcd279e.jpg' },
  { name: 'Nike Mercurial Superfly 10 Elite FG "Kylian Mbappé"', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/FocmjbBDptGJ_dea0ec08.png' },
  { name: 'Nike Mercurial Vapor 16 Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/BFHoUsacbQSa_a10371f2.jpg' },
  // Nike Phantom
  { name: 'Nike Phantom 6 Low Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/85gx2NdXbHu6_bedc43cd.png' },
  { name: 'Nike Phantom 6 High Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/hqCzjahCDzcZ_e5e64c14.webp' },
  { name: 'Nike Phantom 6 Low Pro FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/QRZB7ymMXnt9_bf4d1117.webp' },
  // Nike Tiempo
  { name: 'Nike Tiempo Maestro Elite LE FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/Cs5n4dMKneFW_6f1ea67f.jpg' },
  { name: 'Nike Tiempo Maestro Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/qBEvyrpuFXjY_c5d4ee59.webp' },
  { name: 'Nike Tiempo Ligera Pro LE FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/7FLhaIhuw6Ov_8059980a.webp' },
  // Adidas F50
  { name: 'Adidas F50 League Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/ZfiPuB5l4XQ5_80ef7d51.png' },
  { name: 'Adidas F50 League LL FG/MG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/4MMT88hzu8qj_17f5fee7.webp' },
  { name: 'Adidas F50 League FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/ZxdulOGB0m4M_7bf36835.webp' },
  // Adidas Predator
  { name: 'Adidas Predator Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/YfbdLp428Gfl_7a93680b.jpg' },
  { name: 'Adidas Predator Elite FG High', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/MpSSgMRnIbMa_decc5027.webp' },
  { name: 'Adidas Predator Accuracy Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/SGAoC3TwcO10_2df0d6c9.jpg' },
  // Adidas Copa
  { name: 'Adidas Copa Pure Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/8b3rQHMUWwX7_9d5ae167.jpg' },
  { name: 'Adidas Copa Pure FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/N8upbHkG9xXw_d50b2d26.webp' },
  { name: 'Adidas Copa Pure+ FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/dowNVxvd840C_5996a64f.jpg' },
  // New Balance Tekela
  { name: 'New Balance Tekela Pro Low FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/cD7OJwu4AGuP_f9995739.jpg' },
  { name: 'New Balance Tekela Magique FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/YskYvx0KqyF3_08fde501.jpg' },
  { name: 'New Balance Tekela V4 Pro FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/4MzG6a0d6QAf_433185ca.jpg' },
  // New Balance Furon
  { name: 'New Balance Furon Elite FG V8', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/ng1eCkrzmzjo_dc777e9b.jpg' },
  { name: 'New Balance Furon Elite FG V8 Saka', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/VFnloJTJTC7q_d274e3fc.jpg' },
  { name: 'New Balance Furon Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/2petdJX9msYd_3df85aab.webp' },
  // Puma Future
  { name: 'Puma Future Z 1.3 Elite FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/HJq7kH20NWM0_bf6907fe.png' },
  { name: 'Puma Future Ultimate FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/WUI4cIbheBIC_3589f0a8.webp' },
  { name: 'Puma Future Z 1.3 Colorful FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/JJLuU5edxLka_0769a183.png' },
  // Puma Ultra
  { name: 'Puma Ultra Ultimate FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/KeU32jRKmbkL_e23d406a.jpg' },
  { name: 'Puma Ultra Ultimate FG Yellow', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/sajH1cv6qKSP_b3771f1e.jpg' },
  { name: 'Puma Ultra Pro FG', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663389044073/SRqbrBKqBpwDCXUNRC7znd/0aSIEiv4Ew6E_60783212.jpg' },
];

async function updateImages() {
  try {
    for (const update of imageUpdates) {
      await db.update(products).set({ imageUrl: update.url }).where(eq(products.name, update.name));
      console.log(`Updated: ${update.name}`);
    }
    console.log('All images updated successfully!');
  } catch (error) {
    console.error('Error updating images:', error);
  }
}

updateImages();
