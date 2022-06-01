const CollectionsAdmin = ({ history }: any) => (
  <div
    className="collection-item"
    onClick={() => {
      history.push('/admin/addsection/');
    }}
  >
    <p className="sign_to_action">+</p>
    <p className="text_to_action">Добавить раздел</p>
  </div>
)

export default CollectionsAdmin
