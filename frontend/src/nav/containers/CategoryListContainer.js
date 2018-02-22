import React from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchCategories } from '../navActions';
import CategoryList from '../components/CategoryList';

class CategoryListContainer extends React.Component {
  componentDidMount() {
    const { dispatchGetAllCategories } = this.props;
    dispatchGetAllCategories();
  }

  render() {
    const {
      type,
      open,
      onClose,
      categories,
      selectedCategory,
      dispatchSelectCategory // on category select
    } = this.props;
    return (
      <CategoryList
        open={open}
        onClose={onClose}
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={dispatchSelectCategory}
        type={type}
      />
    );
  }
}

const mapStateToProps = ({ selectedCategory, categories }) => ({
  selectedCategory,
  categories: categories.items
});

const mapDispatchToProps = dispatch => ({
  dispatchGetAllCategories: () => dispatch(fetchCategories()),
  dispatchSelectCategory: data => {
    dispatch(selectCategory(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryListContainer
);
