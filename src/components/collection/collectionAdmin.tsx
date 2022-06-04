const CollectionAdmin = ({ history, sectionName }: { history: { push: Function }, sectionName: string }) => (
  <div
    className="collection_item_admin"
    onClick={() => {
      history.push(
        `/admin/${sectionName}/addProduct`
      );
    }}
  >
    <p className="sign_to_action">+</p>
    <p className="text_to_action">Add new item</p>
  </div>
);

export default CollectionAdmin
