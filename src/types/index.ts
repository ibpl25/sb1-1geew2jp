export interface TestimonialType {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface ServiceOption {
  id: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  highlight?: boolean;
  bestValue?: boolean;
}

export interface GroupedOption {
  id: string;
  title: string;
  subtitle: string;
  options: ServiceOption[];
}

export interface ServiceType {
  title: string;
  description: string;
  image: string;
  options: (ServiceOption | GroupedOption)[];
}

export interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}