import React, { lazy, Suspense } from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";

// ✅ Lazy-loaded components
const Testimonials = lazy(() =>
  import("../components/Testimonials").then((module) => ({
    default: module.default || module,
  }))
);

const GenerateBtn = lazy(() =>
  import("../components/GenerateBtn").then((module) => ({
    default: module.default || module,
  }))
);

const Home = () => {
  return (
    <main aria-label="Homepage content">
      <Header />
      <Steps />
      <Description />

      {/* ✅ Wrap lazy components with Suspense */}
      <Suspense
        fallback={
          <div className="text-center py-10 text-gray-500">
            Loading testimonials...
          </div>
        }
      >
        <Testimonials />
      </Suspense>

      <Suspense
        fallback={
          <div className="text-center py-10 text-gray-500">
            Loading generator...
          </div>
        }
      >
        <GenerateBtn />
      </Suspense>
    </main>
  );
};

export default Home;
