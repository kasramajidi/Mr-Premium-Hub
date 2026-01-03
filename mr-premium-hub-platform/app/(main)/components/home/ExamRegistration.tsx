"use client";

interface ExamCard {
  title: string;
  description: string;
}

const exams: ExamCard[] = [
  {
    title: "University",
    description: "ثبت مقاله و خوابگاه",
  },
  {
    title: "Application Fee",
    description: "اپلیکیشن فی",
  },
  {
    title: "GRE",
    description: "آزمون GRE",
  },
  {
    title: "TOFEL",
    description: "ثبت نام تافل",
  },
];

export default function ExamRegistration() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 text-center mb-8 md:mb-12">
          ثبت نام آزمون های بین المللی
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-white p-6 transition-opacity hover:opacity-80 cursor-pointer text-center"
            >
              <h3 className="text-base font-medium text-gray-900 mb-1">
                {exam.title}
              </h3>
              <p className="text-xs text-gray-600">{exam.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
