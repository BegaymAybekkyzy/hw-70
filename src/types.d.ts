interface contactForm {
  name: string;
  phone: string;
  email: string;
  image: string;
}

interface contact extends contactForm {
  id: string;
}

interface contactAPI {
  [id: string]: contactForm;
}
