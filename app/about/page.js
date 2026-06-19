export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-6">
          About Allahabad Law Publications
        </h1>

        <p className="text-xl text-center text-gray-600 mb-12">
          Trusted Legal Knowledge Since 1959
        </p>

        <div className="bg-white p-10 rounded-xl shadow-sm border">

          <h2 className="text-2xl font-bold mb-4">
            Our Legacy
          </h2>

          <p className="text-gray-700 leading-8 mb-8">
            Allahabad Law Publications was established in 1959 and has been
            dedicated to providing authoritative legal literature for more
            than six decades. Founded by Raj Kishore Narula, the publication
            house has served advocates, law students, judicial service
            aspirants and legal professionals across India.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700 leading-8 mb-8">
            Our mission is to provide accurate, practical and affordable legal
            knowledge through high-quality publications that assist legal
            education and professional practice.
          </p>

          <h2 className="text-2xl font-bold mb-4">
            Our Publications
          </h2>

          <ul className="list-disc pl-6 text-gray-700 leading-8">
            <li>Bare Acts</li>
            <li>Legal Commentaries</li>
            <li>AIBE Study Materials</li>
            <li>Judicial Service Examination Books</li>
            <li>LL.B. and Law Student Textbooks</li>
            <li>Reference and Professional Legal Literature</li>
          </ul>

        </div>

      </div>
    </main>
  );
}