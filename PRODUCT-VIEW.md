# Product View Page

## Overview

The inventory application now includes a read-only product details page at:

```text
/view/:id
```

For example:

```text
/view/66b1c2e4f3a123456789abcd
```

The page allows users to inspect a product without opening the edit form. Product editing and deletion continue to work from the inventory table.

## Implementation

### 1. Created the detail page

The page was added in:

```text
src/pages/ViewItem.jsx
```

`ViewItem` uses React Router's `useParams` hook to read the product ID from the URL:

```jsx
const { id } = useParams();
```

It then loads the product through the existing API helper:

```jsx
const response = await itemAPI.getOne(id);
setItem(response.data.data);
```

No backend changes were required because the backend already exposes:

```text
GET /api/items/:id
```

### 2. Added loading and error handling

While the product is loading, the page displays a skeleton layout instead of leaving the screen blank.

If the request fails, the page:

1. Displays the API error message when available.
2. Shows a generic fallback message otherwise.
3. Navigates the user back to the inventory page.

This is handled inside the page's data-loading effect:

```jsx
try {
  const response = await itemAPI.getOne(id);
  setItem(response.data.data);
} catch (error) {
  toast.error(
    error.response?.data?.message || "Failed to fetch item details"
  );
  navigate("/");
}
```

### 3. Registered the route

The route was added to:

```text
src/App.jsx
```

```jsx
<Route path="/view/:id" element={<ViewItem />} />
```

The route is placed alongside the existing create and edit routes:

```text
/                  Inventory overview
/create            Create a product
/view/:id          View product details
/edit/:id          Edit a product
```

### 4. Added links from the inventory table

Product names in:

```text
src/components/ItemTable.jsx
```

are now links to the corresponding view page:

```jsx
<Link to={`/view/${item._id}`}>
  {item.name}
</Link>
```

The existing **Edit** and **Delete** actions were left unchanged, so users can still manage products directly from the inventory table.

## Details displayed

The view page displays:

- Product name
- Product initial as a visual identifier
- Category
- Description
- Price in CFA francs
- Stock status
- Last updated date

The page also includes:

- A breadcrumb-style link back to the inventory
- A **Back to Items** button
- An **Edit Item** button
- Responsive styling for smaller screens
- Category and stock-status color styles consistent with the inventory UI

## Data flow

```text
User clicks product name
        ↓
React Router opens /view/:id
        ↓
ViewItem reads :id with useParams()
        ↓
itemAPI.getOne(id)
        ↓
GET /api/items/:id
        ↓
ViewItem renders the returned product
```

## Validation

The implementation was checked using the existing frontend commands:

```bash
npm run lint
npm run build
```

Both commands complete successfully.
