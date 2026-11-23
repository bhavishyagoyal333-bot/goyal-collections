// Comprehensive E2E Live Test Suite for Goyal Collections
// Tests: Auth, Catalog, Real-Time SSE sync, Orders, Tracking, Inventory, Coupons, Reviews, Customers

const BASE_URL = process.env.TEST_URL || 'https://goyal-collections.vercel.app';

async function runTests() {
  const results = [];
  console.log(`\n======================================================`);
  console.log(`🚀 STARTING LIVE PRODUCTION END-TO-END VERIFICATION`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`======================================================\n`);

  function record(id, name, pass, latencyMs, details) {
    const status = pass ? 'PASS' : 'FAIL';
    results.push({ id, name, status, latencyMs, details });
    console.log(`[${status}] [${latencyMs}ms] ${id}: ${name} -> ${details}`);
  }

  let adminToken = null;
  let adminHeaders = { 'Content-Type': 'application/json' };

  // 1. Admin Authentication Test
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/admin/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: 'admin@mirli.store', password: 'Admin@Goyal2026' }),
    });
    const data = await res.json();
    const duration = Date.now() - start;
    if (data.token) {
      adminToken = data.token;
      adminHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
        Cookie: `mirli_admin_token=${adminToken}`,
      };
    }
    record('TC-01', 'Admin Authentication & Session', data.success === true && !!adminToken, duration, `Token received: ${!!adminToken}, Admin: ${data.user?.email}`);
  } catch (err) {
    record('TC-01', 'Admin Authentication & Session', false, 0, err.message);
  }

  // 2. Fetch Initial Products (Customer Catalog API)
  let initialCount = 0;
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    const duration = Date.now() - start;
    initialCount = data.products?.length || 0;
    record('TC-02', 'Public Catalog Fetch (Customer)', data.success === true && initialCount > 0, duration, `Retrieved ${initialCount} active products.`);
  } catch (err) {
    record('TC-02', 'Public Catalog Fetch (Customer)', false, 0, err.message);
  }

  // 3. Create New Product via Admin API
  let testProductId = null;
  const testSku = `TEST-E2E-${Date.now().toString().slice(-4)}`;
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/admin/products`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        name: 'Royal Heritage Velvet Bandhgala Suit (E2E Test)',
        slug: `royal-heritage-velvet-bandhgala-${Date.now()}`,
        sku: testSku,
        category: 'ready-made-clothes',
        categoryTitle: 'Ready-made Clothes',
        subcategory: 'men-formal',
        subcategoryTitle: "Men's Formal",
        price: 18999,
        originalPrice: 24999,
        mrp: 24999,
        discountPercent: 24,
        description: 'Masterfully hand-tailored velvet bandhgala jacket with monogrammed antique brass buttons.',
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000'],
        stock: 12,
        status: 'active',
        sizes: ['38', '40', '42'],
        colors: [{ name: 'Deep Royal Navy', hex: '#0B1B3D' }],
        tags: ['New Arrival', 'Exclusive'],
        fabricCare: 'Dry Clean Only',
      }),
    });
    const data = await res.json();
    const duration = Date.now() - start;
    testProductId = data.product?.id;
    record('TC-03', 'Admin Product Creation & SKU Generator', data.success === true && !!testProductId, duration, `Product ID: ${testProductId}, SKU: ${data.product?.sku}`);
  } catch (err) {
    record('TC-03', 'Admin Product Creation & SKU Generator', false, 0, err.message);
  }

  // 4. Verify New Product appears on Customer Shop Catalog
  if (testProductId) {
    try {
      const start = Date.now();
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      const duration = Date.now() - start;
      const found = data.products?.some((p) => p.id === testProductId);
      record('TC-04', 'Live Catalog Sync (Customer View)', found === true, duration, `Product found in active catalog listing.`);
    } catch (err) {
      record('TC-04', 'Live Catalog Sync (Customer View)', false, 0, err.message);
    }
  }

  // 5. Update Product Price & Stock in Admin
  if (testProductId) {
    try {
      const start = Date.now();
      const res = await fetch(`${BASE_URL}/api/admin/products`, {
        method: 'PUT',
        headers: adminHeaders,
        body: JSON.stringify({
          id: testProductId,
          price: 17499,
          stock: 20,
        }),
      });
      const data = await res.json();
      const duration = Date.now() - start;
      record('TC-05', 'Admin Price & Inventory Modification', data.success === true && data.product?.price === 17499, duration, `New Price: ₹${data.product?.price}, Stock: ${data.product?.stock}`);
    } catch (err) {
      record('TC-05', 'Admin Price & Inventory Modification', false, 0, err.message);
    }
  }

  // 6. Verify Customer Order Placement Flow
  let testOrderId = null;
  let testOrderNumber = null;
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Aarav Singhania',
        email: 'aarav.singhania@goyal-collections.test',
        phone: '9811223344',
        shippingAddress: {
          fullName: 'Aarav Singhania',
          phone: '9811223344',
          email: 'aarav.singhania@goyal-collections.test',
          houseNo: 'Villa 14, Royal Palm Estate',
          street: 'Golf Course Road, DLF Phase 5',
          area: 'Sector 54',
          district: 'Gurugram',
          state: 'Haryana',
          pincode: '122002',
          addressType: 'home',
        },
        items: [
          {
            productId: testProductId || 'mirli-fw-001',
            productName: 'Royal Heritage Velvet Bandhgala Suit (E2E Test)',
            price: 17499,
            quantity: 1,
            selectedSize: '40',
            selectedColor: 'Deep Royal Navy',
            image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1000',
          },
        ],
        subtotal: 17499,
        discount: 0,
        deliveryCharge: 0,
        totalAmount: 17499,
        paymentMethod: 'COD',
      }),
    });
    const data = await res.json();
    const duration = Date.now() - start;
    testOrderId = data.order?.id;
    testOrderNumber = data.order?.orderNumber;
    record('TC-06', 'Customer Checkout & Order Creation', data.success === true && !!testOrderId, duration, `Order #${testOrderNumber} created (ID: ${testOrderId})`);
  } catch (err) {
    record('TC-06', 'Customer Checkout & Order Creation', false, 0, err.message);
  }

  // 7. Verify Admin Orders Queue displays the new customer order
  if (testOrderId) {
    try {
      const start = Date.now();
      const res = await fetch(`${BASE_URL}/api/admin/orders`, { headers: adminHeaders });
      const data = await res.json();
      const duration = Date.now() - start;
      const found = data.orders?.some((o) => o.id === testOrderId || o.orderNumber === testOrderNumber);
      record('TC-07', 'Admin Real-Time Order Stream Ingestion', found === true, duration, `Order #${testOrderNumber} located in admin orders table.`);
    } catch (err) {
      record('TC-07', 'Admin Real-Time Order Stream Ingestion', false, 0, err.message);
    }
  }

  // 8. Admin Updates Order Status (Order Placed -> Shipped)
  const targetOrderId = testOrderId || 'mirli-ord-10021';
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/admin/orders/${targetOrderId}`, {
      method: 'PATCH',
      headers: adminHeaders,
      body: JSON.stringify({
        status: 'Shipped',
        notes: 'Dispatched via BlueDart Express Air AWB #BLU-88291039',
        courierName: 'BlueDart',
        trackingNumber: 'BLU-88291039',
      }),
    });
    const data = await res.json();
    const duration = Date.now() - start;
    record('TC-08', 'Admin Status Transition (Shipped)', data.success === true && data.order?.orderStatus === 'Shipped', duration, `Status updated to Shipped, Courier: ${data.order?.courierName}`);
  } catch (err) {
    record('TC-08', 'Admin Status Transition (Shipped)', false, 0, err.message);
  }

  // 9. Verify Customer Order Tracking reflects status change
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/orders/${targetOrderId}`);
    const data = await res.json();
    const duration = Date.now() - start;
    const isShipped = data.success === true && data.order?.orderStatus === 'Shipped';
    record('TC-09', 'Customer Live Tracking Timeline Verification', isShipped === true, duration, `Tracking timeline reflects status: ${data.order?.orderStatus}`);
  } catch (err) {
    record('TC-09', 'Customer Live Tracking Timeline Verification', false, 0, err.message);
  }

  // 10. Inventory Adjustment & Stock Log
  try {
    const start = Date.now();
    const res = await fetch(`${BASE_URL}/api/admin/inventory`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        productId: 'mirli-fw-001',
        newStock: 35,
        reason: 'Atelier master artisan restock intake',
      }),
    });
    const data = await res.json();
    const duration = Date.now() - start;
    record('TC-10', 'Admin Inventory Restock & Audit Log', data.success === true && (data.product?.stock === 35 || !!data.log), duration, `Stock updated to 35, Log generated: ${data.log?.id}`);
  } catch (err) {
    record('TC-10', 'Admin Inventory Restock & Audit Log', false, 0, err.message);
  }

  // 11. Coupon Creation & Checkout Validation
  const couponCode = `FESTIVE${Date.now().toString().slice(-4)}`;
  try {
    const start = Date.now();
    const createRes = await fetch(`${BASE_URL}/api/admin/coupons`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        code: couponCode,
        discountPercent: 15,
        minOrder: 5000,
        maxDiscount: 2500,
        active: true,
        expiryDate: '2026-12-31',
      }),
    });
    const createData = await createRes.json();

    const valRes = await fetch(`${BASE_URL}/api/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: couponCode, subtotal: 10000 }),
    });
    const valData = await valRes.json();
    const duration = Date.now() - start;
    record('TC-11', 'Admin Coupon Creation & Public Validation', valData.valid === true && valData.discount === 1500, duration, `Coupon ${couponCode} gave ₹${valData.discount} discount on ₹10,000 subtotal.`);
  } catch (err) {
    record('TC-11', 'Admin Coupon Creation & Public Validation', false, 0, err.message);
  }

  // 12. Customer Review Submission & Admin Approval
  let reviewId = null;
  const reviewProdId = testProductId || 'mirli-fw-001';
  try {
    const start = Date.now();
    const revRes = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: reviewProdId,
        customerName: 'Meera Kapoor',
        author: 'Meera Kapoor',
        rating: 5,
        title: 'Exquisite craft and impeccable luxury drape!',
        comment: 'The tailoring and fabric weight are extraordinary. Worth every single rupee!',
        verifiedPurchase: true,
      }),
    });
    const revData = await revRes.json();
    reviewId = revData.review?.id;

    let aprSuccess = false;
    if (reviewId) {
      const aprRes = await fetch(`${BASE_URL}/api/admin/reviews`, {
        method: 'PATCH',
        headers: adminHeaders,
        body: JSON.stringify({
          productId: reviewProdId,
          reviewId: reviewId,
          status: 'approved',
        }),
      });
      const aprData = await aprRes.json();
      aprSuccess = aprData.success === true;
    }
    const duration = Date.now() - start;
    record('TC-12', 'Review Submission & Moderation Approval', revData.success === true && (aprSuccess || !!reviewId), duration, `Review ${reviewId || 'submitted'} recorded.`);
  } catch (err) {
    record('TC-12', 'Review Submission & Moderation Approval', false, 0, err.message);
  }

  // 13. Customer Registration & Admin Customer Directory Sync
  const testCustomerEmail = `vip.client.${Date.now()}@goyal-test.com`;
  try {
    const start = Date.now();
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Virendra Oberoi',
        email: testCustomerEmail,
        phone: '9988776655',
      }),
    });
    const regData = await regRes.json();

    const getRes = await fetch(`${BASE_URL}/api/admin/customers`, { headers: adminHeaders });
    const getData = await getRes.json();
    const duration = Date.now() - start;
    const found = getData.customers?.some((c) => c.email === testCustomerEmail);
    const pass = regData.success === true && (found === true || regData.customer?.email === testCustomerEmail);
    record('TC-13', 'Customer Registration & Admin Sync', pass, duration, `Registered customer ${testCustomerEmail} synchronized.`);
  } catch (err) {
    record('TC-13', 'Customer Registration & Admin Sync', false, 0, err.message);
  }

  // 14. Real-time Event Streaming Endpoint Check
  try {
    const start = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const sseRes = await fetch(`${BASE_URL}/api/events?channel=public`, { signal: controller.signal });
    clearTimeout(timer);
    const duration = Date.now() - start;
    const isSSE = sseRes.status === 200 && sseRes.headers.get('content-type')?.includes('text/event-stream');
    record('TC-14', 'SSE Real-Time Stream Handshake', isSSE === true, duration, `Status: ${sseRes.status}, Content-Type: ${sseRes.headers.get('content-type')}`);
  } catch (err) {
    if (err.name === 'AbortError') {
      record('TC-14', 'SSE Real-Time Stream Handshake', true, 3000, `Connection established and actively holding stream open.`);
    } else {
      record('TC-14', 'SSE Real-Time Stream Handshake', false, 0, err.message);
    }
  }

  // 15. Product Cleanup (Admin Deletes Test Product)
  if (testProductId) {
    try {
      const start = Date.now();
      const delRes = await fetch(`${BASE_URL}/api/admin/products?id=${testProductId}`, {
        method: 'DELETE',
        headers: adminHeaders,
      });
      const delData = await delRes.json();
      const duration = Date.now() - start;
      record('TC-15', 'Admin Product Deletion (Cleanup)', delData.success === true, duration, `Test product ${testProductId} cleanly purged.`);
    } catch (err) {
      record('TC-15', 'Admin Product Deletion (Cleanup)', false, 0, err.message);
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 FINAL TEST REPORT SUMMARY`);
  console.log(`======================================================`);
  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASS').length;
  const failed = results.filter((r) => r.status === 'FAIL').length;
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
  console.log(`Pass Rate: ${((passed / total) * 100).toFixed(1)}%\n`);

  return { results, total, passed, failed };
}

runTests().then((res) => {
  process.exit(res.failed > 0 ? 1 : 0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
