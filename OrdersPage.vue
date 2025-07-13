<template>
  <div class="orders-wrapper">
    <!-- Top Tab Navigation -->
    <div class="tab-nav">
      <div class="tab-nav-inner">
        <button
          v-for="status in statuses"
          :key="status"
          :class="{ active: currentStatus === status }"
          @click="selectStatus(status)"
          class="tab-button"
        >
          <span class="tab-text">{{ capitalize(status) }}</span>
          <span v-if="getOrderCount(status) > 0" class="tab-count">{{ getOrderCount(status) }}</span>
        </button>
      </div>
    </div>

    <!-- Orders List -->
    <div class="orders-container">
      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="empty-state">
        <div class="empty-icon">📦</div>
        <h3 class="empty-title">No {{ currentStatus }} orders</h3>
        <p class="empty-description">
          Orders with {{ currentStatus }} status will appear here when available.
        </p>
      </div>

      <!-- Orders Grid -->
      <div v-else class="orders-grid">
        <div
          v-for="(order, index) in filteredOrders"
          :key="order._id"
          class="order-card"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <!-- Order Header -->
          <div class="order-header">
            <div class="header-left">
              <span :class="['status-badge', getStatusClass(order.status)]">
                <span class="status-indicator"></span>
                {{ capitalize(order.status) }}
              </span>
              <span class="order-id">Order #{{ order._id.toUpperCase() }}</span>
            </div>
            <div class="header-right">
              <span class="order-date">{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>

          <!-- Order Items -->
          <div class="order-section">
            <h4 class="section-title">
              <span class="section-icon">📦</span>
              Items ({{ order.items.length }})
            </h4>
            <div class="items-list">
              <div
                v-for="(item, i) in order.items"
                :key="i"
                class="item-row"
              >
                <img :src="getProductImage(item.productId)" class="item-thumb" :alt="`Product ${item.productId}`" />
                <div class="item-main">
                  <span class="item-product">Product {{ item.productId }}</span>
                  <span class="item-details">Option {{ item.OptionNumber }} • Qty: {{ item.quantity }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment & Shipping Info -->
          <div class="order-details">
            <div class="details-grid">
              <div class="detail-item">
                <span class="detail-label">Total Amount</span>
                <span class="detail-value total-amount">₱{{ formatCurrency(order.total) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Payment Method</span>
                <span class="detail-value">{{ formatPaymentMethod(order.paymentMethod) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Payment Status</span>
                <span :class="['detail-value', 'payment-status', getPaymentStatusClass(order.paymentStatus)]">
                  {{ order.paymentStatus }}
                </span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Tracking Number</span>
                <span class="detail-value tracking-number">
                  {{ order.trackingNumber || 'Not assigned' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="order-section">
            <h4 class="section-title">
              <span class="section-icon">🏠</span>
              Shipping Address
            </h4>
            <div class="address-content">
              <p class="address-text">
                {{ formatAddress(order.shippingAddress) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface OrderItem {
  productId: string
  OptionNumber: number
  quantity: number
}

interface ShippingAddress {
  street: string
  barangay: string
  city: string
  province: string
  zipCode: string
}

interface Order {
  _id: string
  status: string
  createdAt: string
  total: number
  paymentMethod: string
  paymentStatus: string
  trackingNumber: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
}

// Status configuration
const statuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
const currentStatus = ref('pending')

// Mock Orders Data
const orders = ref<Order[]>([
  {
    _id: 'ord001',
    status: 'pending',
    createdAt: '2025-01-12T10:15:00Z',
    total: 1299.5,
    paymentMethod: 'wallet',
    paymentStatus: 'Pending',
    trackingNumber: '',
    items: [
      { productId: 'PRD123', OptionNumber: 1, quantity: 2 },
      { productId: 'PRD456', OptionNumber: 0, quantity: 1 },
    ],
    shippingAddress: {
      street: '123 Example Street',
      barangay: 'Barangay Sample',
      city: 'Quezon City',
      province: 'Metro Manila',
      zipCode: '1100',
    },
  },
  {
    _id: 'ord002',
    status: 'delivered',
    createdAt: '2025-01-10T08:30:00Z',
    total: 899.99,
    paymentMethod: 'cod',
    paymentStatus: 'Paid',
    trackingNumber: 'TRK1234567890',
    items: [
      { productId: 'PRD789', OptionNumber: 2, quantity: 1 },
    ],
    shippingAddress: {
      street: '456 Sample Avenue',
      barangay: 'Barangay Central',
      city: 'Manila',
      province: 'Metro Manila',
      zipCode: '1000',
    },
  },
  {
    _id: 'ord003',
    status: 'shipped',
    createdAt: '2025-01-11T14:22:00Z',
    total: 2150.75,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    trackingNumber: 'TRK9876543210',
    items: [
      { productId: 'PRD321', OptionNumber: 0, quantity: 3 },
      { productId: 'PRD654', OptionNumber: 1, quantity: 1 },
    ],
    shippingAddress: {
      street: '789 Commerce Road',
      barangay: 'Barangay Business',
      city: 'Makati',
      province: 'Metro Manila',
      zipCode: '1200',
    },
  },
])

// Computed properties
const filteredOrders = computed(() => {
  return orders.value.filter(order => order.status === currentStatus.value)
})

// Helper functions
const selectStatus = (status: string) => {
  currentStatus.value = status
}

const getOrderCount = (status: string) => {
  return orders.value.filter(order => order.status === status).length
}

const capitalize = (val: string) => val.charAt(0).toUpperCase() + val.slice(1)

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPaymentMethod = (method: string) => {
  const methods: Record<string, string> = {
    'wallet': 'Digital Wallet',
    'cod': 'Cash on Delivery',
    'card': 'Credit/Debit Card'
  }
  return methods[method] || method
}

const formatAddress = (address: ShippingAddress) => {
  return `${address.street}, ${address.barangay}, ${address.city}, ${address.province} ${address.zipCode}`
}

const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'pending': 'status-pending',
    'paid': 'status-paid',
    'shipped': 'status-shipped',
    'delivered': 'status-delivered',
    'cancelled': 'status-cancelled'
  }
  return statusClasses[status] || ''
}

const getPaymentStatusClass = (status: string) => {
  return status.toLowerCase() === 'paid' ? 'payment-paid' : 'payment-pending'
}

const getProductImage = (id: string) => `https://picsum.photos/seed/${id}/120/120`
</script>

<style scoped>
/* ... existing code ... */
.item-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2);
  background: var(--gray-50);
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
}

.item-row:hover {
  background: white;
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}

.item-thumb {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--border-radius);
  background: var(--gray-100);
}

.item-product {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-800);
}

.item-details {
  font-size: 13px;
  color: var(--gray-500);
}
</style>