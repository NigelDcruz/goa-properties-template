const http = require("http");

// Helper to make quick HTTP requests in Node.js
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: path,
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({
              status: res.statusCode,
              data: JSON.parse(data),
            });
          } catch (e) {
            resolve({ status: res.statusCode, data: data });
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("\x1b[36m%s\x1b[0m", "🚀 Starting Local API Test Suite...\n");

  try {
    // 1. GET /api/properties (Fetch all)
    console.log("1. Fetching all properties...");
    const resGet = await request("GET", "/api/properties");
    console.log(`Status: ${resGet.status}`);
    console.log(`Count: ${resGet.data.data ? resGet.data.data.length : 0} items found.`);
    if (resGet.data.data && resGet.data.data.length > 0) {
      console.log(`First Property Slug: "${resGet.data.data[0].slug}"\n`);
    }

    // 2. GET /api/properties?search=Villa (Search filter)
    console.log("2. Searching properties for keyword 'Villa'...");
    const resSearch = await request("GET", "/api/properties?search=Villa");
    console.log(`Status: ${resSearch.status}`);
    console.log(`Matching results: ${resSearch.data.data ? resSearch.data.data.length : 0}\n`);

    // 3. POST /api/properties (Create a new listing)
    console.log("3. Creating a new luxury property listing...");
    const newProperty = {
      title: "Antigravity Penthouse in Candolim",
      location: "Candolim, North Goa",
      price: "₹ 8.50 Cr",
      image: "/images/villa-1.webp",
      bedrooms: 3,
      bathrooms: 4,
      area: "3200 sq.ft.",
      listingType: "sale",
      verified: true,
      slug: "antigravity-penthouse-candolim",
    };
    const resCreate = await request("POST", "/api/properties", newProperty);
    console.log(`Status: ${resCreate.status}`);
    if (resCreate.status === 201) {
      console.log("\x1b[32m%s\x1b[0m", "✓ Property created successfully!");
      console.log(`Generated ID: ${resCreate.data.data.id}\n`);
    } else {
      console.log("❌ Failed to create:", resCreate.data);
      return;
    }

    const newId = resCreate.data.data.id;

    // 4. GET /api/properties/[id-or-slug] (Fetch by slug)
    console.log(`4. Fetching newly created property by slug "antigravity-penthouse-candolim"...`);
    const resFetchSlug = await request("GET", `/api/properties/antigravity-penthouse-candolim`);
    console.log(`Status: ${resFetchSlug.status}`);
    console.log(`Title found: "${resFetchSlug.data.data ? resFetchSlug.data.data.title : "None"}"\n`);

    // 5. PUT /api/properties/[id] (Update property)
    console.log(`5. Updating price of property ID: ${newId}...`);
    const resUpdate = await request("PUT", `/api/properties/${newId}`, {
      price: "₹ 9.00 Cr",
    });
    console.log(`Status: ${resUpdate.status}`);
    if (resUpdate.status === 200) {
      console.log("\x1b[32m%s\x1b[0m", `✓ Price updated to: ${resUpdate.data.data.price}\n`);
    }

    // 6. DELETE /api/properties/[id] (Clean up / Delete)
    console.log(`6. Deleting property ID: ${newId}...`);
    const resDelete = await request("DELETE", `/api/properties/${newId}`);
    console.log(`Status: ${resDelete.status}`);
    if (resDelete.status === 200) {
      console.log("\x1b[32m%s\x1b[0m", "✓ Property deleted successfully!");
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "\n❌ Test execution failed!");
    console.error(error.message);
    console.log("\x1b[33m%s\x1b[0m", "Ensure the dev server is running (npm run dev) on port 3000 before executing.");
  }
}

runTests();
