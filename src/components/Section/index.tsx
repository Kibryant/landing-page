type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return (
    <section className="w-full mt-4 flex justify-center items-center">
      <div className="max-w-7xl">{children}</div>
    </section>
  );
};

export { Section };
