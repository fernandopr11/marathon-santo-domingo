import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  ChipProps,
} from '@nextui-org/react';
import React, { useState, useCallback, useMemo } from 'react';

import { ChevronDownIcon } from '@/components/preinscripciones/ChevronDownIcon';
import { SearchIcon } from '@/components/icons';
import {
  columns,
  pagos as initialPagos,
} from '@/components/aprobrar_pagos/data';
import { capitalize } from '@/components/preinscripciones/utils';
import DefaultLayout from '@/layouts/default';
import { updatePayment } from '@/services/api';

const INITIAL_VISIBLE_COLUMNS = columns.map((col) => col.uid);

type Pago = (typeof initialPagos)[0];

// Agregar columna de vista previa del pago
const extendedColumns = [
  ...columns,
  { uid: 'preview', name: 'VISTA PREVIA DEL PAGO' },
];

export default function App() {
  const [pagos, setPagos] = useState(initialPagos);
  const [filterValue, setFilterValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'id',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return extendedColumns;

    return extendedColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredPagos = [...pagos];

    if (hasSearchFilter) {
      filteredPagos = filteredPagos.filter((pago) =>
        pago.cedula.toString().includes(filterValue)
      );
    }

    return filteredPagos;
  }, [filterValue, pagos]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Pago, b: Pago) => {
      const first = a[sortDescriptor.column as keyof Pago] as number;
      const second = b[sortDescriptor.column as keyof Pago] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const handleAccept = async (id: any) => {
    try {
      setPagos((prevPagos) =>
        prevPagos.map((pago) =>
          pago.id === id ? { ...pago, status: 'Aprobado' } : pago
        )
      );
      await updatePayment(id, { payment_status: 'Aprobado' });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleReject = async (id: any) => {
    try {
      setPagos((prevPagos) =>
        prevPagos.map((pago) =>
          pago.id === id ? { ...pago, status: 'Rechazado' } : pago
        )
      );
      await updatePayment(id, { payment_status: 'Rechazado' });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const statusColorMap: Record<string, ChipProps['color']> = {
    Pendiente: 'warning',
    Aprobado: 'success',
    Rechazado: 'danger',
  };

  const renderCell = useCallback(
    (pago: Pago, columnKey: React.Key) => {
      let cellValue = pago[columnKey as keyof Pago];

      // Convert Date to string
      if (cellValue instanceof Date) {
        cellValue = cellValue.toLocaleDateString();
      }

      switch (columnKey) {
        case 'status':
          return (
            <Chip color={statusColorMap[pago.status]} size="sm" variant="flat">
              {pago.status}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Button
                isIconOnly
                size="sm"
                color="success"
                variant="light"
                onPress={() => handleAccept(pago.id)}
              >
                ✓
              </Button>
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onPress={() => handleReject(pago.id)}
              >
                ✕
              </Button>
            </div>
          );
        case 'preview':
          return (
            <a
              href="#"
              className="text-blue-500 underline"
              onClick={() => {
                setSelectedImage('/images/comprobante.jpg'); // Ruta relativa a la imagen en la carpeta public
                setModalVisible(true);
              }}
            >
              Ver Pago
            </a>
          );
        default:
          return cellValue as React.ReactNode;
      }
    },
    [statusColorMap]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {extendedColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {pagos.length} pagos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Registros por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    pagos.length,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los registros seleccionados'
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <DefaultLayout>
      <Table
        isHeaderSticky
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === 'actions' || column.uid === 'preview'
                  ? 'center'
                  : 'start'
              }
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No payments found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedImage && (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <ModalContent>
            <ModalHeader>
              <h2>Vista previa del pago</h2>
            </ModalHeader>
            <ModalBody>
              <img
                src={selectedImage}
                alt="Vista previa del pago"
                className="rounded-lg shadow-md"
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setModalVisible(false)}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </DefaultLayout>
  );
}
