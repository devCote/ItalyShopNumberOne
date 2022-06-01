const CollectionAdmin = ({ history, sectionName }: { history: { push: Function }, sectionName: string }) => (
  <div
    className="collection_item_admin"
    onClick={() => {
      history.push(
        `/${sectionName}/addProduct`
      );
    }}
  >
    <p className="sign_to_action">+</p>
    <p className="text_to_action">Добавить позицию</p>
  </div>
);

export default CollectionAdmin
