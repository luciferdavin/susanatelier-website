import { HandIcon, FormIcon, NeedleIcon, LeafIcon, InfinityIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";

const values = [
  { Icon: HandIcon, label: "Handcrafted" },
  { Icon: FormIcon, label: "Contemporary" },
  { Icon: NeedleIcon, label: "Artisanal" },
  { Icon: LeafIcon, label: "Feminine" },
  { Icon: InfinityIcon, label: "Timeless" },
];

export default function ValuesBand() {
  return (
    <section className="values" aria-label="What Susan Atelier stands for">
      <div className="container values-row">
        {values.map(({ Icon, label }) => (
          <Reveal className="value" key={label} direction="none">
            <Icon />
            <span>{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
