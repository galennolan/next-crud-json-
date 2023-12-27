This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Next.js CRUD Products

This project demonstrates a simple CRUD (Create, Read, Update, Delete) functionality for managing products using Next.js, a React framework, along with a JSON server as the backend.

## Features

1. **Product List**: Displays a list of products fetched from the server.
2. **Add Product**: Allows users to add new products using a modal form.
3. **Update Product**: Enables users to edit existing products through a modal form.
4. **Delete Product**: Provides an option to delete products with a confirmation modal.

## Technologies Used

- **Next.js**: A React framework for building web applications.
- **JSON Server**: A simple REST API server using a JSON file as a database.

## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-crud-products.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-crud-products
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the JSON server:

   ```bash
   npm run server
   ```

   This will run the JSON server on `http://localhost:5000`.

5. Open a new terminal window and start the Next.js application:

   ```bash
   npm run dev
   ```

   The Next.js application will be accessible at `http://localhost:3000`.

## Usage

1. Visit `http://localhost:3000` in your web browser to view the product list.
2. Use the "Add New Product" button to add new products using the modal form.
3. Click the "Edit" button to update existing products using the update modal form.
4. Press the "Delete" button to remove products with a confirmation modal.

## API Documentation

### `getProducts()`

- **Description**: Fetches the list of products from the server.
- **Returns**: Promise<Array<product>> - Array of products.

### `product` Type

- **Description**: Represents the structure of a product.
- **Properties**:
  - `id`: Number - Unique identifier for the product.
  - `title`: String - Product name.
  - `price`: Number - Product price.

## Notes

- The use of `cache: "no-store"` in the `fetch` options ensures that the browser does not cache the API response, providing real-time data updates.

Feel free to customize and expand upon this project according to your needs!

## JSON-server

#Install json-server
npm i json-server

#Run json
npx json-server --watch db.json -p 5000
