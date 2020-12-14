import { Utilisateur } from 'src/app/interfaces/utilisateur';
export class Payement {

  id?: number;
  totalAmount?: string;
  createdOn?: Date;
  status?: number;
  userCli: Utilisateur;
  customerEmail?: string;
  interventionId?: number;
  subscriptionId?: number;
  comments?: string;
  type?: string;
  reference?: string;
  authCode?: string;
  userId?: number;

}
// total_amount:  details.purchase_units[0].amount.value,//this.shipping_region_id,
// status: (details.status === 'COMPLETED') ? 1 : 0,
// intervention_id: this.customer_id,
// auth_code: details.purchase_units[0].amount.currency_code,
// created_on: details.create_time,
// reference: details.id,
// customer_email: details.payer.email_address,
// comments: details.payer.name.given_name + ' ' + details.payer.name.surname,
// type: ENUM (INTERVENTION, COMMISSION)