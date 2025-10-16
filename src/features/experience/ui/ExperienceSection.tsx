interface Props {
  period: string;
  jobTitle: string;
  company: string;
  description: React.ReactNode;
}
export default function ExperienceSection({
  period,
  jobTitle,
  company,
  description,
}: Props) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-base font-medium text-white">{period}</h2>
        <p className="hidden text-base text-slate-400 md:block">{jobTitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-base text-white">{company}</h3>
        <div className="visible inline-flex items-center gap-2 md:invisible">
          <span className="text-[.75rem] text-slate-300">|</span>
          <p className="text-base text-slate-400">{jobTitle}</p>
        </div>
      </div>
      <p className="text-base text-slate-400">{description}</p>
    </section>
  );
}
