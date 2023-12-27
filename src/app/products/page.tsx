import { AddProduct } from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

// Data Type: Definisikan tipe data 'product' untuk merepresentasikan produk.
type product = {
  id: number;
  title: string;
  price: number;
};

// Fungsi 'getProducts': Ambil data produk dari server secara asynchronous.
/**
 * @returns {Promise<Array<product>>} - Daftar produk dalam bentuk array promise.
 */
async function getProducts() {
  // Gunakan fetch untuk mengambil data dari endpoint "http://localhost:5000/products".
  const res = await fetch("http://localhost:5000/products", {
    // Opsi cache: "no-store" menandakan bahwa browser tidak boleh menyimpan respons ini dalam cache. sehingga jika terjadi perubaahan di api akan otomatis terupdate
    cache: "no-store",
  });
  // Konversi respons ke dalam format JSON.
  return res.json();
}

// Komponen 'ProductList': Tampilkan daftar produk menggunakan data yang diambil dari server.
/**
 * @component
 * @description Komponen React untuk menampilkan daftar produk dari server.
 * @returns {JSX.Element} - Elemen React yang berisi daftar produk.
 */
export default async function ProductList() {
  // Ambil daftar produk menggunakan fungsi 'getProducts'.
  const products: product[] = await getProducts();

  // Tampilkan daftar produk dalam elemen 'div' menggunakan metode '.map'.
  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddProduct />
      </div>
      {/* Tabel untuk menampilkan daftar produk */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterasi melalui setiap produk dan tampilkan dalam baris tabel */}
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="flex">
                <div className="mr-1">
                  <UpdateProduct {...product} />
                </div>

                <DeleteProduct {...product} />
              </td>
              {/* Kolom untuk aksi, dapat disesuaikan sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
