import React from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../navActions';
import { fetchPostsByCategory } from '../../dashboard/dashboardActions';
import CategoryList from '../components/CategoryList';
import { fetchCategories } from '../navActions';

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
      selectCategory // on category select
    } = this.props;
    return (
      <CategoryList
        open={open}
        onClose={onClose}
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={selectCategory}
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
  selectCategory: data => {
    dispatch(selectCategory(data));
    dispatch(fetchPostsByCategory(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CategoryListContainer
);
