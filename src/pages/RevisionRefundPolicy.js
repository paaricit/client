import React from 'react';
import './PolicyPage.scss';

const RevisionRefundPolicy = () => (
  <div className="policy-page">
    <h1>Revision & Refund Policy</h1>
    <h2>1. Revisions</h2>
    <p>At weDoForYou, you are entitled to free revisions within 7 days of delivery, provided the original instructions remain unchanged.</p>
    <h2>2. Refunds</h2>
    <p>Refunds are considered under the following conditions:</p>
    <ul>
      <li>The assignment was not delivered.</li>
      <li>The delivered work was plagiarized or entirely irrelevant.</li>
      <li>The tutor failed to follow original requirements after revisions.</li>
    </ul>
    <p>To claim a refund, contact support with your order ID and details within 7 days of delivery.</p>
    <p><strong>Note:</strong> We reserve the right to refuse a refund if:</p>
    <ul>
      <li>You provided unclear or misleading instructions.</li>
      <li>Revision requests deviate from the original order.</li>
    </ul>
  </div>
);

export default RevisionRefundPolicy; 