/**
 * Forge-specific database schema
 * Extends the shared schema with construction billing tables
 */

import {
  pgTable,
  text,
  timestamp,
  uuid,
  numeric,
  integer,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { organizations } from '@tributaries/database';

/**
 * Construction projects
 */
export const projects = pgTable('forge_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  name: text('name').notNull(),
  number: text('number').notNull(),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email'),
  address: text('address'),
  contractAmount: numeric('contract_amount', { precision: 12, scale: 2 }).notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  status: text('status').default('active').notNull(), // active, completed, on_hold
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Schedule of values (line items for billing)
 */
export const scheduleOfValues = pgTable('forge_schedule_of_values', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  itemNumber: text('item_number').notNull(),
  description: text('description').notNull(),
  scheduledValue: numeric('scheduled_value', { precision: 12, scale: 2 }).notNull(),
  previouslyBilled: numeric('previously_billed', { precision: 12, scale: 2 }).default('0'),
  currentBilled: numeric('current_billed', { precision: 12, scale: 2 }).default('0'),
  materialsStored: numeric('materials_stored', { precision: 12, scale: 2 }).default('0'),
  retainage: numeric('retainage', { precision: 12, scale: 2 }).default('0'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Change orders
 */
export const changeOrders = pgTable('forge_change_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  number: text('number').notNull(),
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  status: text('status').default('pending').notNull(), // pending, approved, rejected
  submittedDate: timestamp('submitted_date'),
  approvedDate: timestamp('approved_date'),
  approvedBy: text('approved_by'),
  addedToBilling: boolean('added_to_billing').default(false),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Subcontractors
 */
export const subcontractors = pgTable('forge_subcontractors', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  trade: text('trade'),
  taxId: text('tax_id'),
  insuranceExpiry: timestamp('insurance_expiry'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Subcontractor pay applications
 */
export const payApplications = pgTable('forge_pay_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  subcontractorId: uuid('subcontractor_id')
    .references(() => subcontractors.id)
    .notNull(),
  applicationNumber: integer('application_number').notNull(),
  periodFrom: timestamp('period_from').notNull(),
  periodTo: timestamp('period_to').notNull(),
  contractAmount: numeric('contract_amount', { precision: 12, scale: 2 }).notNull(),
  workCompleted: numeric('work_completed', { precision: 12, scale: 2 }).notNull(),
  materialsStored: numeric('materials_stored', { precision: 12, scale: 2 }).default('0'),
  retainagePercent: numeric('retainage_percent', { precision: 5, scale: 2 }).default('10'),
  currentPayment: numeric('current_payment', { precision: 12, scale: 2 }).notNull(),
  status: text('status').default('submitted').notNull(), // submitted, under_review, approved, rejected, paid
  documentUrl: text('document_url'),
  extractedData: jsonb('extracted_data').default({}),
  reviewNotes: text('review_notes'),
  approvedAt: timestamp('approved_at'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * AIA billing applications (G702/G703)
 */
export const billingApplications = pgTable('forge_billing_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  applicationNumber: integer('application_number').notNull(),
  periodTo: timestamp('period_to').notNull(),
  originalContractSum: numeric('original_contract_sum', { precision: 12, scale: 2 }).notNull(),
  changeOrdersTotal: numeric('change_orders_total', { precision: 12, scale: 2 }).default('0'),
  contractSumToDate: numeric('contract_sum_to_date', { precision: 12, scale: 2 }).notNull(),
  totalCompletedAndStored: numeric('total_completed_and_stored', { precision: 12, scale: 2 }).notNull(),
  retainagePercent: numeric('retainage_percent', { precision: 5, scale: 2 }).default('10'),
  totalRetainage: numeric('total_retainage', { precision: 12, scale: 2 }).notNull(),
  totalEarned: numeric('total_earned', { precision: 12, scale: 2 }).notNull(),
  previousPayments: numeric('previous_payments', { precision: 12, scale: 2 }).default('0'),
  currentPaymentDue: numeric('current_payment_due', { precision: 12, scale: 2 }).notNull(),
  balanceToFinish: numeric('balance_to_finish', { precision: 12, scale: 2 }).notNull(),
  status: text('status').default('draft').notNull(), // draft, submitted, approved, paid
  pdfUrl: text('pdf_url'),
  submittedAt: timestamp('submitted_at'),
  approvedAt: timestamp('approved_at'),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ScheduleOfValue = typeof scheduleOfValues.$inferSelect;
export type ChangeOrder = typeof changeOrders.$inferSelect;
export type Subcontractor = typeof subcontractors.$inferSelect;
export type PayApplication = typeof payApplications.$inferSelect;
export type BillingApplication = typeof billingApplications.$inferSelect;
