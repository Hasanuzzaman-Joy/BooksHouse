import { use } from "react";
import { Link } from "react-router";
import ZoomInSection from "./ZoomInSection";
import Container from "./Container";

export default function FeaturedCategories({ categoriesData }) {
  const categories = use(categoriesData);

  return (
    <Container>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {categories.map((category) => (
          <ZoomInSection key={category.id}>
            <div className="card w-full bg-[#f4f3f3] shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="card-body flex flex-col items-center text-center">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>

                <h2 className="card-title text-[#242253] text-2xl font-bold">
                  {category.name}
                </h2>

                <p className="text-gray-700 text-base">{category.subtitle}</p>

                <div className="card-actions mt-4 justify-center">
                  <Link
                    to={`/categories/${category.name}`}
                    className="btn bg-[#242253] text-white hover:bg-[#bfbdff] hover:text-[#242253] transition-all"
                  >
                    Browse {category.name}
                  </Link>
                </div>
              </div>
            </div>
          </ZoomInSection>
        ))}
      </section>
    </Container>
  );
}
