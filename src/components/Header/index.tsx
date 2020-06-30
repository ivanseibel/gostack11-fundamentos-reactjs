import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected?: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected = 'dashboard',
}: HeaderProps) => {
  const dashClass = selected === 'dashboard' && 'selected';
  const importClass = selected === 'import' && 'selected';

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link className={dashClass || 'unselected'} to="/">
            Listagem
          </Link>
          <Link className={importClass || 'unselected'} to="/import">
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
