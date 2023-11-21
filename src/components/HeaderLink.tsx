type HeaderLinkPropsType = {
  name: string;
  href: string;
  isActive: boolean;
};

export default function HeaderLink({ name, href, isActive }: HeaderLinkPropsType) {
  return (
    <li className={isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}>
      <a href={href}>{name}</a>
    </li>
  );
}
