import { useEffect, useState } from 'react';
import { Table, Spin, message, Pagination } from 'antd';
import axios from '../../../axios';

export default function Accounts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { title: 'Kode', dataIndex: 'code', key: 'code' },
    { title: 'Nama Akun', dataIndex: 'name', key: 'name' },
    { title: 'Tipe', key: 'type.name',
      render: (record) => (
        <span>{record.type.name}</span>
      ),
     },
    // nanti bisa tambah tombol edit/delete
  ];

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const res = await axios.get('/accounts/data', {
        params: {
          space_id: 1,
          draw: 1,
          start: (page - 1) * pageSize,
          length: pageSize,
        },
      });

      setData(res.data.data);
      setTotal(res.data.recordsFiltered); // atau res.data.total sesuai strukturmu
    } catch (err) {
      console.error(err);
      message.error('Gagal mengambil data akun');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Daftar Akun</h2>

      <div style={{ overflowX: 'auto' }}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={false} // kita pakai Pagination terpisah
        />
      </div>

      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={(p, ps) => {
            setPage(p);
            setPageSize(ps);
          }}
          showSizeChanger
        />
      </div>
    </div>
  );
}
