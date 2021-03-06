import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { BASE_TEXT, WEIGHT } from '../../shared/style/typography';
import { BLACK, GUNSMOKE, LILAC } from '../../shared/style/colors';
import TagList from './tag-list.jsx';

const Container = styled('li')({
  listStyleType: 'none'
});

const Link = styled('div')({
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  borderBottom: `1px solid ${LILAC}`,
  cursor: 'pointer'
});

const Thumbnail = styled('img')({
  width: 80,
  height: 80,
  marginRight: 10
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column'
});

const Name = styled('div')({
  ...BASE_TEXT,
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: WEIGHT.BOLD,
  color: BLACK
});

const Description = styled('div')({
  ...BASE_TEXT,
  color: GUNSMOKE,
  lineHeight: '20px',
  marginBottom: 12
});

const Footer = styled('div')({
  display: 'flex'
});

export default class ProductCard extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    votesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    tags: PropTypes.array
  };

  render() {
    const { name, description, imageUrl, tags } = this.props;
    return (
      <Container>
        <Link>
          <Thumbnail src={imageUrl} />
          <Content>
            <Name>{name}</Name>
            <Description>{description}</Description>
            <Footer>
              <TagList tags={tags} />
            </Footer>
          </Content>
        </Link>
      </Container>
    );
  }
}
