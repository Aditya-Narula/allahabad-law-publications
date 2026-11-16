
export default function BankTransferDetails({ paymentReady = false }) {
  if (!paymentReady) {
    return (
      <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Payment information
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Bank transfer and UPI payment instructions will
          appear after secure order creation and payment
          verification are enabled.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 text-gray-900">
      <h2 className="text-xl font-bold">
        Bank Transfer Details
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Use these details only for the confirmed payment
        instructions associated with your order.
      </p>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="font-semibold">Account Holder</dt>
          <dd>ALLAHABAD LAW PUBLICATIONS</dd>
        </div>

        <div>
          <dt className="font-semibold">Bank</dt>
          <dd>ICICI Bank</dd>
        </div>

        <div>
          <dt className="font-semibold">Branch</dt>
          <dd>Tagore Town, Allahabad</dd>
        </div>

        <div>
          <dt className="font-semibold">Account Type</dt>
          <dd>Current Account</dd>
        </div>

        <div>
          <dt className="font-semibold">Account Number</dt>
          <dd>066005000443</dd>
        </div>

        <div>
          <dt className="font-semibold">IFSC</dt>
          <dd>ICIC0000660</dd>
        </div>

        <div>
          <dt className="font-semibold">UPI ID</dt>
          <dd>ALLAHABAD.LAW@icici</dd>
        </div>
      </dl>

      <p className="mt-5 text-sm font-medium text-amber-800">
        Payment is subject to independent verification.
        A payment screenshot does not confirm an order.
      </p>
    </section>
  );
}
