export default function Docs({ params }) {
    const { slug } = params; // slug akan berupa array
    return <h1>Docs for: {slug.join("/")}</h1>;
  }  