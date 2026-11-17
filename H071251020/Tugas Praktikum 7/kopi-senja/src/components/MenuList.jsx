import MenuCard from "./MenuCard.jsx";

function MenuList({ menuList, onTambah, onBukaDetail }) {
  if (menuList.length === 0) {
    return <p className="text-gray-500 italic">Tidak ada menu di kategori ini.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuList.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onTambah={onTambah}
          onBukaDetail={onBukaDetail}
        />
      ))}
    </div>
  );
}

export default MenuList;