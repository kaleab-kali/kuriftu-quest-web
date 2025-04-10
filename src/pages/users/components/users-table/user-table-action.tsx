import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';
import UserCreateForm from '../user-forms/user-create-form';

export default function UserTableActions() {
  return (
    <div className="flex items-center justify-between gap-2 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search People Here" />
      </div>
      <div className="flex gap-3">
        <PopupModal
          renderModal={(onClose) => <UserCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
