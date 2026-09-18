export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
}

export const principlesData: PrincipleItem[] = [
  {
    id: "built-around-problem",
    number: "01",
    title: "Built Around the Problem",
    summary: "We start with commercial and operational reality, not technology hype.",
    description:
      "Technology is an instrument, not the destination. Before writing a line of code, we dissect the commercial friction, operational bottleneck, or customer experience failure we are setting out to solve."
  },
  {
    id: "technology-with-purpose",
    number: "02",
    title: "Technology With Purpose",
    summary: "Every architectural choice must justify its operational value.",
    description:
      "We avoid vanity tech stacks and unnecessary complexity. Whether deploying vector search, reactive frontends, or event-driven webhooks, every tool is chosen because it directly solves the objective."
  },
  {
    id: "product-thinking",
    number: "03",
    title: "Product Thinking",
    summary: "We treat client solutions with the rigor of proprietary products.",
    description:
      "We don’t just ship code and walk away. We build intuitive ergonomics, automated test coverage, clear documentation, and maintainable systems designed for long-term product lifecycles."
  },
  {
    id: "ai-where-it-helps",
    number: "04",
    title: "AI Where It Actually Helps",
    summary: "Practical automation over superficial AI novelties.",
    description:
      "Artificial intelligence should create tangible operational leverage—automating manual document triage, surfacing domain knowledge, and speeding up workflows—rather than acting as a gimmick."
  },
  {
    id: "systems-that-evolve",
    number: "05",
    title: "Systems That Can Evolve",
    summary: "Modularity engineered for business growth and adaptation.",
    description:
      "Like the chameleon adapting to its environment, your software architecture must adapt as your business expands, pivots, or scales, without requiring total rebuilds from scratch."
  },
  {
    id: "designed-for-real-businesses",
    number: "06",
    title: "Designed for Real Businesses",
    summary: "Software that your actual team and customers enjoy using.",
    description:
      "Enterprise utility doesn’t have to mean ugly, clunky software. We engineer high-speed, human-centered interfaces that make complex data and workflows effortless to navigate."
  }
];
