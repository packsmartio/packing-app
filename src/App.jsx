import React, { useState, useMemo, useEffect } from "react";

// ── 翻訳データ ──────────────────────────────────────────
const TRANSLATIONS = {
  ja: {
    appSub: "PACK SMART",
    appTitle: "忘れ物ゼロ",
    tabs: ["イベント", "持ち物", "追加", "設定"],
    addEvent: "＋ イベント",
    addItem: "＋ 追加",
    newEvent: "新しいイベント",
    eventName: "イベント名",
    eventNamePlaceholder: "例：実家への帰省",
    periodic: "定期",
    oneTime: "単発",
    cancel: "キャンセル",
    create: "作成",
    save: "保存",
    deleteEvent: "🗑 このイベントを削除",
    editEvent: "イベントを編集",
    items: "アイテム",
    done: "完了",
    noItems: "アイテムがありません",
    noItemsHint: "「追加」タブから追加しましょう",
    sortDay: "日程順",
    sortPrep: "準備方法順",
    sortName: "名前順",
    prepAll: "準備: すべて",
    addTo: (name) => `${name} に追加`,
    itemName: "アイテム名",
    itemNamePlaceholder: "例：充電器、着替え、パスポート",
    qty: "個数",
    qtyUnit: "個",
    days: "何日目に使う？（複数OK）",
    daysUnit: "日目",
    resetDays: "リセット",
    prepMethod: "準備方法",
    prepMethods: ["家にある", "買う", "レンタル"],
    whereLabel: "どこで買う？",
    wherePlaceholder: "例：コンビニ、ドラッグストア",
    category: "カテゴリ",
    categories: ["衣類", "書類", "電子機器", "日用品", "食べ物", "その他"],
    tags: "オリジナルタグ（複数OK）",
    addToList: "✓ リストに追加する",
    settings: "設定",
    useCat: "カテゴリ機能を使う",
    useCatDesc: "OFFにするとカテゴリが非表示になります",
    manageTags: "オリジナルタグを管理",
    manageTagsDesc: "カテゴリとは別の自由なグループ分けができます",
    resetChecks: "もう一度使う（チェックをリセット）",
    noTags: "タグがまだありません",
    newTag: "新しいタグ名",
    addTag: "追加",
    editItem: "アイテムを編集",
    deleteItem: "🗑 削除",
    language: "言語",
    selectEvent: "イベントを選択",
    selectEventHint: "「イベント」タブからイベントを選んでください",
    sampleModalTitle: "サンプルデータを追加しますか？",
    sampleModalDesc: "旅行の例を追加して、使い方をすぐに確認できます。後から削除できます。",
    sampleModalYes: "✨ 追加する",
    sampleModalNo: "空の状態で始める",
    langSelectTitle: "言語を選んでください",
    langSelectBtn: "次へ →",
  },
  en: {
    appSub: "PACK SMART",
    appTitle: "Never Forget",
    tabs: ["Events", "List", "Add", "Settings"],
    addEvent: "+ Event",
    addItem: "+ Add",
    newEvent: "New Event",
    eventName: "Event Name",
    eventNamePlaceholder: "e.g. Summer vacation",
    periodic: "Recurring",
    oneTime: "One-time",
    cancel: "Cancel",
    create: "Create",
    save: "Save",
    deleteEvent: "🗑 Delete this event",
    editEvent: "Edit Event",
    items: "items",
    done: "done",
    noItems: "No items yet",
    noItemsHint: "Add items from the \"Add\" tab",
    sortDay: "By day",
    sortPrep: "By prep",
    sortName: "By name",
    prepAll: "Prep: All",
    addTo: (name) => `Add to: ${name}`,
    itemName: "Item Name",
    itemNamePlaceholder: "e.g. Charger, Clothes, Passport",
    qty: "Quantity",
    qtyUnit: "",
    days: "Which day(s)? (multi-select OK)",
    daysUnit: "",
    resetDays: "Reset",
    prepMethod: "How to prepare",
    prepMethods: ["Have it", "Buy it", "Rent it"],
    whereLabel: "Where to buy?",
    wherePlaceholder: "e.g. Pharmacy, Supermarket",
    category: "Category",
    categories: ["Clothing", "Documents", "Electronics", "Toiletries", "Food", "Other"],
    tags: "Custom Tags (multi-select OK)",
    addToList: "✓ Add to List",
    settings: "Settings",
    useCat: "Use Category feature",
    useCatDesc: "Turn off to hide categories",
    manageTags: "Manage Custom Tags",
    manageTagsDesc: "Create your own grouping labels",
    resetChecks: "Use again (reset checks)",
    noTags: "No tags yet",
    newTag: "New tag name",
    addTag: "Add",
    editItem: "Edit Item",
    deleteItem: "🗑 Delete",
    language: "Language",
    selectEvent: "Select an event",
    selectEventHint: "Choose an event from the \"Events\" tab",
    sampleModalTitle: "Add sample data?",
    sampleModalDesc: "Add a sample trip to explore the app. You can delete it anytime.",
    sampleModalYes: "✨ Add sample",
    sampleModalNo: "Start empty",
    langSelectTitle: "Choose your language",
    langSelectBtn: "Next →",
  },
  fr: {
    appSub: "PACK SMART",
    appTitle: "Zéro Oubli",
    tabs: ["Événements", "Liste", "Ajouter", "Réglages"],
    addEvent: "+ Événement",
    addItem: "+ Ajouter",
    newEvent: "Nouvel événement",
    eventName: "Nom de l'événement",
    eventNamePlaceholder: "ex : Vacances d'été",
    periodic: "Récurrent",
    oneTime: "Unique",
    cancel: "Annuler",
    create: "Créer",
    save: "Enregistrer",
    deleteEvent: "🗑 Supprimer cet événement",
    editEvent: "Modifier l'événement",
    items: "articles",
    done: "fait",
    noItems: "Aucun article",
    noItemsHint: "Ajoutez des articles depuis l'onglet \"Ajouter\"",
    sortDay: "Par jour",
    sortPrep: "Par préparation",
    sortName: "Par nom",
    prepAll: "Prép : Tous",
    addTo: (name) => `Ajouter à : ${name}`,
    itemName: "Nom de l'article",
    itemNamePlaceholder: "ex : Chargeur, Vêtements, Passeport",
    qty: "Quantité",
    qtyUnit: "",
    days: "Quel(s) jour(s) ? (multi-sélection OK)",
    daysUnit: "",
    resetDays: "Réinitialiser",
    prepMethod: "Comment préparer",
    prepMethods: ["J'ai déjà", "Acheter", "Louer"],
    whereLabel: "Où acheter ?",
    wherePlaceholder: "ex : Pharmacie, Supermarché",
    category: "Catégorie",
    categories: ["Vêtements", "Documents", "Électronique", "Toilettes", "Nourriture", "Autre"],
    tags: "Tags personnalisés (multi OK)",
    addToList: "✓ Ajouter à la liste",
    settings: "Réglages",
    useCat: "Utiliser les catégories",
    useCatDesc: "Désactiver pour masquer les catégories",
    manageTags: "Gérer les tags",
    manageTagsDesc: "Créez vos propres étiquettes",
    resetChecks: "Réutiliser (réinitialiser)",
    noTags: "Pas encore de tags",
    newTag: "Nouveau tag",
    addTag: "Ajouter",
    editItem: "Modifier l'article",
    deleteItem: "🗑 Supprimer",
    language: "Langue",
    selectEvent: "Sélectionner un événement",
    selectEventHint: "Choisissez un événement depuis l'onglet \"Événements\"",
    sampleModalTitle: "Ajouter des données exemple ?",
    sampleModalDesc: "Ajoutez un voyage exemple pour explorer l'app. Vous pouvez le supprimer à tout moment.",
    sampleModalYes: "✨ Ajouter",
    sampleModalNo: "Commencer vide",
    langSelectTitle: "Choisissez votre langue",
    langSelectBtn: "Suivant →",
  },
  pt: {
    appSub: "PACK SMART",
    appTitle: "Zero Esquecimento",
    tabs: ["Eventos", "Lista", "Adicionar", "Config"],
    addEvent: "+ Evento",
    addItem: "+ Adicionar",
    newEvent: "Novo Evento",
    eventName: "Nome do Evento",
    eventNamePlaceholder: "ex: Férias de verão",
    periodic: "Recorrente",
    oneTime: "Único",
    cancel: "Cancelar",
    create: "Criar",
    save: "Salvar",
    deleteEvent: "🗑 Excluir este evento",
    editEvent: "Editar Evento",
    items: "itens",
    done: "feito",
    noItems: "Nenhum item ainda",
    noItemsHint: "Adicione itens na aba \"Adicionar\"",
    sortDay: "Por dia",
    sortPrep: "Por preparo",
    sortName: "Por nome",
    prepAll: "Prep: Todos",
    addTo: (name) => `Adicionar a: ${name}`,
    itemName: "Nome do Item",
    itemNamePlaceholder: "ex: Carregador, Roupas, Passaporte",
    qty: "Quantidade",
    qtyUnit: "",
    days: "Qual(is) dia(s)? (múltipla seleção OK)",
    daysUnit: "",
    resetDays: "Resetar",
    prepMethod: "Como preparar",
    prepMethods: ["Já tenho", "Comprar", "Alugar"],
    whereLabel: "Onde comprar?",
    wherePlaceholder: "ex: Farmácia, Supermercado",
    category: "Categoria",
    categories: ["Roupas", "Documentos", "Eletrônicos", "Higiene", "Comida", "Outro"],
    tags: "Tags personalizadas (multi OK)",
    addToList: "✓ Adicionar à Lista",
    settings: "Configurações",
    useCat: "Usar categorias",
    useCatDesc: "Desative para ocultar categorias",
    manageTags: "Gerenciar Tags",
    manageTagsDesc: "Crie seus próprios rótulos",
    resetChecks: "Usar novamente (resetar)",
    noTags: "Nenhuma tag ainda",
    newTag: "Nome da nova tag",
    addTag: "Adicionar",
    editItem: "Editar Item",
    deleteItem: "🗑 Excluir",
    language: "Idioma",
    selectEvent: "Selecionar evento",
    selectEventHint: "Escolha um evento na aba \"Eventos\"",
    sampleModalTitle: "Adicionar dados de exemplo?",
    sampleModalDesc: "Adicione uma viagem de exemplo para explorar o app. Você pode excluir quando quiser.",
    sampleModalYes: "✨ Adicionar",
    sampleModalNo: "Começar vazio",
    langSelectTitle: "Escolha seu idioma",
    langSelectBtn: "Próximo →",
  },
  es: {
    appSub: "PACK SMART",
    appTitle: "Cero Olvidos",
    tabs: ["Eventos", "Lista", "Agregar", "Ajustes"],
    addEvent: "+ Evento",
    addItem: "+ Agregar",
    newEvent: "Nuevo Evento",
    eventName: "Nombre del Evento",
    eventNamePlaceholder: "ej: Vacaciones de verano",
    periodic: "Recurrente",
    oneTime: "Único",
    cancel: "Cancelar",
    create: "Crear",
    save: "Guardar",
    deleteEvent: "🗑 Eliminar este evento",
    editEvent: "Editar Evento",
    items: "artículos",
    done: "hecho",
    noItems: "Sin artículos aún",
    noItemsHint: "Agrega artículos desde la pestaña \"Agregar\"",
    sortDay: "Por día",
    sortPrep: "Por preparación",
    sortName: "Por nombre",
    prepAll: "Prep: Todos",
    addTo: (name) => `Agregar a: ${name}`,
    itemName: "Nombre del Artículo",
    itemNamePlaceholder: "ej: Cargador, Ropa, Pasaporte",
    qty: "Cantidad",
    qtyUnit: "",
    days: "¿Qué día(s)? (múltiple OK)",
    daysUnit: "",
    resetDays: "Resetear",
    prepMethod: "Cómo preparar",
    prepMethods: ["Ya tengo", "Comprar", "Alquilar"],
    whereLabel: "¿Dónde comprar?",
    wherePlaceholder: "ej: Farmacia, Supermercado",
    category: "Categoría",
    categories: ["Ropa", "Documentos", "Electrónica", "Higiene", "Comida", "Otro"],
    tags: "Etiquetas personalizadas (multi OK)",
    addToList: "✓ Agregar a la Lista",
    settings: "Ajustes",
    useCat: "Usar categorías",
    useCatDesc: "Desactivar para ocultar categorías",
    manageTags: "Gestionar Etiquetas",
    manageTagsDesc: "Crea tus propias etiquetas",
    resetChecks: "Usar de nuevo (resetear)",
    noTags: "Sin etiquetas aún",
    newTag: "Nombre de nueva etiqueta",
    addTag: "Agregar",
    editItem: "Editar Artículo",
    deleteItem: "🗑 Eliminar",
    language: "Idioma",
    selectEvent: "Seleccionar evento",
    selectEventHint: "Elige un evento en la pestaña \"Eventos\"",
    sampleModalTitle: "¿Agregar datos de ejemplo?",
    sampleModalDesc: "Agrega un viaje de ejemplo para explorar la app. Puedes eliminarlo cuando quieras.",
    sampleModalYes: "✨ Agregar",
    sampleModalNo: "Empezar vacío",
    langSelectTitle: "Elige tu idioma",
    langSelectBtn: "Siguiente →",
  },
  zh: {
    appSub: "PACK SMART",
    appTitle: "不再忘东西",
    tabs: ["活动", "清单", "添加", "设置"],
    addEvent: "＋ 活动",
    addItem: "＋ 添加",
    newEvent: "新活动",
    eventName: "活动名称",
    eventNamePlaceholder: "例：暑假旅行",
    periodic: "定期",
    oneTime: "单次",
    cancel: "取消",
    create: "创建",
    save: "保存",
    deleteEvent: "🗑 删除此活动",
    editEvent: "编辑活动",
    items: "件物品",
    done: "已完成",
    noItems: "还没有物品",
    noItemsHint: "在「添加」标签页添加物品",
    sortDay: "按日期",
    sortPrep: "按准备方式",
    sortName: "按名称",
    prepAll: "准备方式: 全部",
    addTo: (name) => `添加到：${name}`,
    itemName: "物品名称",
    itemNamePlaceholder: "例：充电器、衣服、护照",
    qty: "数量",
    qtyUnit: "个",
    days: "第几天使用？（可多选）",
    daysUnit: "天",
    resetDays: "重置",
    prepMethod: "准备方式",
    prepMethods: ["已有", "购买", "租借"],
    whereLabel: "在哪里买？",
    wherePlaceholder: "例：超市、药店",
    category: "分类",
    categories: ["服装", "证件", "电子产品", "日用品", "食品", "其他"],
    tags: "自定义标签（可多选）",
    addToList: "✓ 添加到清单",
    settings: "设置",
    useCat: "使用分类功能",
    useCatDesc: "关闭后隐藏分类",
    manageTags: "管理自定义标签",
    manageTagsDesc: "创建自己的分组标签",
    resetChecks: "再次使用（重置勾选）",
    noTags: "还没有标签",
    newTag: "新标签名称",
    addTag: "添加",
    editItem: "编辑物品",
    deleteItem: "🗑 删除",
    language: "语言",
    selectEvent: "选择活动",
    selectEventHint: "请在「活动」标签页选择一个活动",
    sampleModalTitle: "添加示例数据？",
    sampleModalDesc: "添加一个示例旅行来探索应用。随时可以删除。",
    sampleModalYes: "✨ 添加",
    sampleModalNo: "从空白开始",
    langSelectTitle: "请选择语言",
    langSelectBtn: "下一步 →",
  },
  ko: {
    appSub: "PACK SMART",
    appTitle: "빠짐없이 챙기기",
    tabs: ["이벤트", "목록", "추가", "설정"],
    addEvent: "＋ 이벤트",
    addItem: "＋ 추가",
    newEvent: "새 이벤트",
    eventName: "이벤트 이름",
    eventNamePlaceholder: "예: 여름 휴가",
    periodic: "정기",
    oneTime: "단발",
    cancel: "취소",
    create: "만들기",
    save: "저장",
    deleteEvent: "🗑 이 이벤트 삭제",
    editEvent: "이벤트 편집",
    items: "개 아이템",
    done: "완료",
    noItems: "아이템이 없습니다",
    noItemsHint: "\"추가\" 탭에서 아이템을 추가하세요",
    sortDay: "날짜순",
    sortPrep: "준비방법순",
    sortName: "이름순",
    prepAll: "준비: 전체",
    addTo: (name) => `${name}에 추가`,
    itemName: "아이템 이름",
    itemNamePlaceholder: "예: 충전기, 옷, 여권",
    qty: "수량",
    qtyUnit: "개",
    days: "몇 번째 날？（복수 선택 가능）",
    daysUnit: "일차",
    resetDays: "초기화",
    prepMethod: "준비 방법",
    prepMethods: ["이미 있음", "구매", "렌탈"],
    whereLabel: "어디서 살까요?",
    wherePlaceholder: "예: 편의점, 마트",
    category: "카테고리",
    categories: ["의류", "서류", "전자기기", "생활용품", "식품", "기타"],
    tags: "커스텀 태그 (복수 선택 가능)",
    addToList: "✓ 목록에 추가",
    settings: "설정",
    useCat: "카테고리 기능 사용",
    useCatDesc: "끄면 카테고리가 숨겨집니다",
    manageTags: "커스텀 태그 관리",
    manageTagsDesc: "나만의 그룹 태그를 만들 수 있습니다",
    resetChecks: "다시 사용 (체크 초기화)",
    noTags: "태그가 아직 없습니다",
    newTag: "새 태그 이름",
    addTag: "추가",
    editItem: "아이템 편집",
    deleteItem: "🗑 삭제",
    language: "언어",
    selectEvent: "이벤트를 선택하세요",
    selectEventHint: "\"이벤트\" 탭에서 이벤트를 선택하세요",
    sampleModalTitle: "샘플 데이터를 추가할까요?",
    sampleModalDesc: "샘플 여행을 추가해서 앱을 탐색해보세요. 언제든지 삭제할 수 있습니다.",
    sampleModalYes: "✨ 추가하기",
    sampleModalNo: "빈 상태로 시작",
    langSelectTitle: "언어를 선택하세요",
    langSelectBtn: "다음 →",
  },
};

const LANG_OPTIONS = [
  { code: "ja", label: "🇯🇵 日本語" },
  { code: "en", label: "🇺🇸 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "pt", label: "🇧🇷 Português" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "ko", label: "🇰🇷 한국어" },
];

const DAY_NUMS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
const QTY_NUMS = [1,2,3,4,5,6,7,8,9,10,15,20,30,50,100];
const prepColor = (p, methods) => {
  const idx = methods.indexOf(p);
  return idx === 0 ? "#4ade80" : idx === 1 ? "#fb923c" : "#c084fc";
};

const getSampleDate = () => {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() + 3, 1);
  return target.toISOString().split("T")[0];
};

const sampleEvents = {
  ja: [{ id: 1, name: "実家への帰省", type: "定期", nextDate: getSampleDate(), items: [
    { id: 1, name: "着替え", qty: 3, days: [1,2], prep: "家にある", prepWhere: "", category: "衣類", tags: [], done: false },
    { id: 2, name: "充電器", qty: 1, days: [1], prep: "家にある", prepWhere: "", category: "電子機器", tags: [], done: false },
  ]}],
  en: [{ id: 1, name: "Summer Vacation", type: "One-time", nextDate: getSampleDate(), items: [
    { id: 1, name: "Clothes", qty: 3, days: [1,2], prep: "Have it", prepWhere: "", category: "Clothing", tags: [], done: false },
    { id: 2, name: "Charger", qty: 1, days: [1], prep: "Have it", prepWhere: "", category: "Electronics", tags: [], done: false },
  ]}],
};

const emptyItem = (prep) => ({ name: "", qty: 1, days: [], prep, prepWhere: "", category: "", tags: [] });

const calcQty = (cur, n) => Math.min(9999, Math.max(1, n));

// ── QtyPad ─────────────────────────────────────────────
const QtyPad = ({ value, setter, t }) => (
  <div>
    <div style={{ background: "#1e2030", borderRadius: 12, padding: "10px 14px", marginBottom: 8, fontSize: 28, fontWeight: 700, color: "#f0ede8", textAlign: "right" }}>
      {value}<span style={{ fontSize: 13, color: "#555", marginLeft: 6 }}>{t.qtyUnit}</span>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {QTY_NUMS.map(n => (
        <button key={n} onClick={() => setter(p => ({ ...p, qty: calcQty(p.qty, n) }))} style={{ minWidth: 38, height: 38, borderRadius: 10, border: "none", padding: "0 6px", background: "#1e2030", color: "#ccc", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{n}</button>
      ))}
      <button onClick={() => setter(p => ({ ...p, qty: Math.max(1, Math.floor(p.qty / 10)) }))} style={{ minWidth: 38, height: 38, borderRadius: 10, border: "none", padding: "0 10px", background: "#2a1a1a", color: "#f87171", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>⌫</button>
      <button onClick={() => setter(p => ({ ...p, qty: 1 }))} style={{ minWidth: 38, height: 38, borderRadius: 10, border: "none", padding: "0 10px", background: "#1a1a26", color: "#555", fontSize: 11, cursor: "pointer" }}>C</button>
    </div>
  </div>
);

// ── ItemForm ────────────────────────────────────────────
const ItemForm = ({ item, setter, onSave, onCancel, onDelete, t, useCat, userTags, toggleDay, toggleTag, daysLabel }) => (
  <div>
    <input value={item.name} onChange={e => setter(p => ({ ...p, name: e.target.value }))} placeholder={t.itemNamePlaceholder} style={inputStyle} />
    <div style={lbl}>{t.qty}</div>
    <QtyPad value={item.qty} setter={setter} t={t} />
    <div style={{ marginTop: 10 }} />
    <div style={lbl}>{t.days} {item.days.length > 0 && <span style={{ color: "#60a5fa" }}>{daysLabel(item.days)}</span>}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
      {DAY_NUMS.map(d => (
        <button key={d} onClick={() => toggleDay(d, setter)} style={{ width: 38, height: 38, borderRadius: 10, border: "none", background: item.days.includes(d) ? "#3b82f6" : "#1e2030", color: item.days.includes(d) ? "white" : "#666", fontSize: 14, fontWeight: item.days.includes(d) ? 700 : 400, cursor: "pointer" }}>{d}</button>
      ))}
    </div>
    <button onClick={() => setter(p => ({ ...p, days: [] }))} style={{ background: "none", border: "1px solid #333", borderRadius: 8, color: "#555", fontSize: 11, padding: "4px 12px", cursor: "pointer", marginBottom: 12 }}>{t.resetDays}</button>

    <div style={lbl}>{t.prepMethod}</div>
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      {t.prepMethods.map((p) => (
        <button key={p} onClick={() => setter(prev => ({ ...prev, prep: p, prepWhere: "" }))} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: "none", background: item.prep === p ? prepColor(p, t.prepMethods) : "#1e2030", color: item.prep === p ? "#000" : "#888", fontSize: 11, fontWeight: item.prep === p ? 700 : 400, cursor: "pointer" }}>{p}</button>
      ))}
    </div>
    {item.prep === t.prepMethods[1] && (
      <input placeholder={t.wherePlaceholder} value={item.prepWhere} onChange={e => setter(p => ({ ...p, prepWhere: e.target.value }))} style={inputStyle} />
    )}

    {useCat && (
      <>
        <div style={lbl}>{t.category}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {t.categories.map(c => (
            <button key={c} onClick={() => setter(p => ({ ...p, category: p.category === c ? "" : c }))} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: item.category === c ? "#3b82f6" : "#1e2030", color: item.category === c ? "white" : "#888", fontSize: 12, fontWeight: item.category === c ? 700 : 400, cursor: "pointer" }}>{c}</button>
          ))}
        </div>
      </>
    )}

    {userTags.length > 0 && (
      <>
        <div style={lbl}>{t.tags}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {userTags.map(tag => (
            <button key={tag} onClick={() => toggleTag(tag, setter)} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: item.tags.includes(tag) ? "#7c3aed" : "#1e2030", color: item.tags.includes(tag) ? "white" : "#888", fontSize: 12, fontWeight: item.tags.includes(tag) ? 700 : 400, cursor: "pointer" }}>{tag}</button>
          ))}
        </div>
      </>
    )}

    <div style={{ display: "flex", gap: 8, marginBottom: onDelete ? "8px" : "0px" }}>
      <button onClick={onCancel} style={{ ...pillBtn, background: "#2a2d3e", flex: 1 }}>{t.cancel}</button>
      <button onClick={onSave} style={{ ...pillBtn, flex: 2 }}>{t.save}</button>
    </div>
    {onDelete && <button onClick={onDelete} style={{ width: "100%", padding: 8, borderRadius: 8, border: "none", background: "#3a1a1a", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t.deleteItem}</button>}
  </div>
);

export default function App() {
  const load = (key, fallback) => {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };

  // ── 初回判定 ──
  // ps_onboarded が保存されていなければ初回
  const isFirstTime = !localStorage.getItem("ps_onboarded");

  const [lang, setLang] = useState(() => load("ps_lang", "ja"));
  const [showLangSelect, setShowLangSelect] = useState(isFirstTime);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => load("ps_lang", "ja"));

  const t = TRANSLATIONS[lang];
  const initEvents = sampleEvents[lang] || sampleEvents["en"];

  const [events, setEvents] = useState(() => load("ps_events", []));
  const [selectedEventId, setSelectedEventId] = useState(() => load("ps_selectedId", null));
  const [tabIndex, setTabIndex] = useState(0);
  const [sortBy, setSortBy] = useState("day");
  const [filterPrep, setFilterPrep] = useState("all");

  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: "", type: "periodic", nextDate: "" });
  const [editingEvent, setEditingEvent] = useState(null);
  const [newItem, setNewItem] = useState(emptyItem(t.prepMethods[0]));
  const [editingItem, setEditingItem] = useState(null);

  const [useCat, setUseCat] = useState(() => load("ps_useCat", true));
  const [userTags, setUserTags] = useState(() => load("ps_userTags", []));
  const [newTagInput, setNewTagInput] = useState("");

  useEffect(() => { save("ps_events", events); }, [events]);
  useEffect(() => { save("ps_selectedId", selectedEventId); }, [selectedEventId]);
  useEffect(() => { save("ps_lang", lang); }, [lang]);
  useEffect(() => { save("ps_useCat", useCat); }, [useCat]);
  useEffect(() => { save("ps_userTags", userTags); }, [userTags]);
  useEffect(() => {
    const translation = TRANSLATIONS[lang];
    if (translation) setNewItem(emptyItem(translation.prepMethods[0]));
  }, [lang]);




  const selectedEvent = events.find(e => e.id === selectedEventId);
  const filteredItems = useMemo(() => {
    const currentEvent = events.find(e => e.id === selectedEventId);
    if (!currentEvent) return [];
    let items = [...currentEvent.items];
    if (filterPrep !== "all") items = items.filter(i => i.prep === filterPrep);
    items.sort((a, b) => sortBy === "day" ? (a.days[0]||99)-(b.days[0]||99) : sortBy === "prep" ? a.prep.localeCompare(b.prep) : a.name.localeCompare(b.name));
    return items;
  }, [events, selectedEventId, sortBy, filterPrep]);

  const addEvent = () => {
    if (!newEvent.name.trim()) return;
    const typeLabel = newEvent.type === "periodic" ? t.periodic : t.oneTime;
    const ev = { ...newEvent, type: typeLabel, id: Date.now(), items: [] };
    setEvents(p => [...p, ev]);
    setSelectedEventId(ev.id);
    setNewEvent({ name: "", type: "periodic", nextDate: "" });
    setShowAddEvent(false); setTabIndex(1);
  };
  const saveEditEvent = () => {
    if (!editingEvent?.name.trim()) return;
    setEvents(p => p.map(e => e.id === editingEvent.id ? { ...e, ...editingEvent } : e));
    setEditingEvent(null);
  };
  const deleteEvent = (id) => {
    const remaining = events.filter(e => e.id !== id);
    setEvents(remaining);
    if (selectedEventId === id) {
      setSelectedEventId(remaining[0]?.id || null);
    }
    setEditingEvent(null);
  };
  const updateItems = (fn) => setEvents(p => p.map(e => e.id === selectedEventId ? { ...e, items: fn(e.items) } : e));
  const toggleDone = (id) => updateItems(items => items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const deleteItem = (id) => updateItems(items => items.filter(i => i.id !== id));
  const addItem = () => {
    if (!newItem.name.trim()) return;
    updateItems(items => [...items, { ...newItem, id: Date.now(), done: false }]);
    setNewItem(emptyItem(t.prepMethods[0])); setTabIndex(1);
  };
  const saveEditItem = () => {
    if (!editingItem?.name.trim()) return;
    updateItems(items => items.map(i => i.id === editingItem.id ? { ...editingItem } : i));
    setEditingItem(null);
  };

  const resetChecks = (eventId) => {
    setEvents(p => p.map(e => e.id === eventId ? { ...e, items: e.items.map(i => ({ ...i, done: false })) } : e));
  };

  const isPeriodicType = (type) => {
    return ["定期", "Recurring", "Récurrent", "Recorrente", "Recurrente", "정기", "periodic", t.periodic].includes(type);
  };

  const toggleDay = (d, setter) => setter(p => ({ ...p, days: p.days.includes(d) ? p.days.filter(x=>x!==d).sort((a,b)=>a-b) : [...p.days,d].sort((a,b)=>a-b) }));
  const toggleTag = (tag, setter) => setter(p => ({ ...p, tags: p.tags.includes(tag) ? p.tags.filter(t=>t!==tag) : [...p.tags,tag] }));
  const daysLabel = (days) => !days?.length ? "—" : days.map(d => lang === "ja" ? `${d}${t.daysUnit}` : lang === "ko" ? `${d}${t.daysUnit}` : lang === "zh" ? `第${d}${t.daysUnit}` : `Day ${d}`).join(", ");

  // ── 言語選択画面 ──────────────────────────────────────
  if (showLangSelect) {
    return (
      <div style={{ background: "#0f0f13", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui,sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧳</div>
        <div style={{ fontSize: 11, color: "#60a5fa", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>PACK SMART</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#f0ede8", marginBottom: 40 }}>
          {(TRANSLATIONS[selectedLang] || TRANSLATIONS["ja"]).langSelectTitle}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320 }}>
          {LANG_OPTIONS.map(l => (
            <button key={l.code} onClick={() => setSelectedLang(l.code)} style={{
              padding: "14px 20px", borderRadius: 14, border: "none",
              background: selectedLang === l.code ? "linear-gradient(135deg,#2563eb,#3b82f6)" : "#1a1a26",
              color: selectedLang === l.code ? "white" : "#888",
              fontSize: 16, fontWeight: selectedLang === l.code ? 700 : 400,
              cursor: "pointer", textAlign: "left",
              border: selectedLang === l.code ? "none" : "1px solid #ffffff08",
            }}>{l.label}</button>
          ))}
        </div>
        <button onClick={() => {
          setLang(selectedLang);
          save("ps_lang", selectedLang);
          setShowLangSelect(false);
          // ps_eventsが空なら次にサンプルモーダルを表示
          const existing = load("ps_events", []);
          if (!existing || existing.length === 0) {
            setShowSampleModal(true);
          }
          save("ps_onboarded", "1");
        }} style={{
          marginTop: 32, padding: "16px 48px", borderRadius: 40,
          background: "linear-gradient(135deg,#2563eb,#3b82f6)",
          color: "white", fontSize: 16, fontWeight: 700,
          border: "none", cursor: "pointer", width: "100%", maxWidth: 320,
        }}>
          {(TRANSLATIONS[selectedLang] || TRANSLATIONS["ja"]).langSelectBtn}
        </button>
      </div>
    );
  }

  // ── サンプルデータモーダル ────────────────────────────
  if (showSampleModal) {
    return (
      <div style={{ background: "#0f0f13", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui,sans-serif" }}>
        <div style={{ maxWidth: 360, width: "100%", background: "#1a1a26", borderRadius: 20, padding: "32px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📋</div>
          <h2 style={{ color: "#f0ede8", fontSize: 20, margin: "0 0 12px", fontWeight: 700 }}>
            {t.sampleModalTitle}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 28px", lineHeight: 1.7 }}>
            {t.sampleModalDesc}
          </p>
          <button onClick={() => {
            const sample = sampleEvents[lang] || sampleEvents["en"];
            setEvents(sample);
            save("ps_events", sample);
            setSelectedEventId(sample[0]?.id || null);
            setShowSampleModal(false);
          }} style={{
            width: "100%", padding: 16, borderRadius: 14,
            background: "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "#fff", fontSize: 16, fontWeight: 700,
            border: "none", marginBottom: 12, cursor: "pointer",
          }}>
            {t.sampleModalYes}
          </button>
          <button onClick={() => setShowSampleModal(false)} style={{
            width: "100%", padding: 14, borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 15, border: "none", cursor: "pointer",
          }}>
            {t.sampleModalNo}
          </button>
        </div>
      </div>
    );
  }

  // ── Tab: Events ─────────────────────────────────────────
  const renderEvents = () => (
    <div>
      {showAddEvent && (
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 12 }}>{t.newEvent}</div>
          <input placeholder={t.eventNamePlaceholder} value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} style={inputStyle} />
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {["periodic","oneTime"].map(type => (
              <button key={type} onClick={() => setNewEvent({ ...newEvent, type })} style={{ flex: 1, padding: 8, borderRadius: 8, border: "none", background: newEvent.type === type ? "#3b82f6" : "#2a2d3e", color: newEvent.type === type ? "white" : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{type === "periodic" ? t.periodic : t.oneTime}</button>
            ))}
          </div>
          <input type="date" value={newEvent.nextDate} onChange={e => setNewEvent({ ...newEvent, nextDate: e.target.value })} style={inputStyle} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowAddEvent(false)} style={{ ...pillBtn, background: "#2a2d3e", flex: 1 }}>{t.cancel}</button>
            <button onClick={addEvent} style={{ ...pillBtn, flex: 2 }}>{t.create}</button>
          </div>
        </div>
      )}
      {events.map(ev => (
        <div key={ev.id} style={{ ...card, marginBottom: 10 }}>
          {editingEvent?.id === ev.id ? (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", marginBottom: 10 }}>{t.editEvent}</div>
              <input value={editingEvent.name} onChange={e => setEditingEvent({ ...editingEvent, name: e.target.value })} style={inputStyle} />
              <input type="date" value={editingEvent.nextDate || ""} onChange={e => setEditingEvent({ ...editingEvent, nextDate: e.target.value })} style={inputStyle} />
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button onClick={() => setEditingEvent(null)} style={{ ...pillBtn, background: "#2a2d3e", flex: 1 }}>{t.cancel}</button>
                <button onClick={saveEditEvent} style={{ ...pillBtn, flex: 2 }}>{t.save}</button>
              </div>
              <button onClick={() => deleteEvent(ev.id)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "none", background: "#3a1a1a", color: "#f87171", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t.deleteEvent}</button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isPeriodicType(ev.type) && ev.items.some(i => i.done) ? 10 : 0 }}>
                <div style={{ flex: 1, cursor: "pointer" }} onClick={() => { setSelectedEventId(ev.id); setTabIndex(1); }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{ev.name}</div>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ background: "#1d4ed840", color: "#60a5fa", padding: "2px 8px", borderRadius: 10, marginRight: 8, fontSize: 11 }}>{ev.type}</span>
                    {ev.nextDate && <span style={{ color: "#666" }}>📅 {ev.nextDate}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ textAlign: "right", cursor: "pointer" }} onClick={() => { setSelectedEventId(ev.id); setTabIndex(1); }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#3b82f6" }}>{ev.items.length}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>{t.items}</div>
                  </div>
                  <button onClick={() => setEditingEvent({ id: ev.id, name: ev.name, type: ev.type, nextDate: ev.nextDate || "" })} style={{ background: "#1e2030", border: "none", borderRadius: 8, color: "#888", fontSize: 14, cursor: "pointer", padding: "6px 8px" }}>✎</button>
                </div>
              </div>
              {isPeriodicType(ev.type) && ev.items.some(i => i.done) && (
                <button onClick={() => resetChecks(ev.id)} style={{ width: "100%", padding: "8px", borderRadius: 10, border: "none", background: "#1a2a1a", color: "#4ade80", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  🔄 {t.resetChecks}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── Tab: List ───────────────────────────────────────────
  const renderItems = () => (
    <div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedEvent?.name || t.selectEvent}</div>
        {!selectedEvent && <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>{t.selectEventHint}</div>}
        {selectedEvent && (
          <>
            <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{filteredItems.filter(i=>i.done).length} / {filteredItems.length} {t.done}</div>
            <div style={{ height: 4, background: "#1e2030", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${filteredItems.length ? (filteredItems.filter(i=>i.done).length/filteredItems.length)*100 : 0}%`, background: "linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius: 2, transition: "width 0.4s" }} />
            </div>
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10, overflowX: "auto", paddingBottom: 4 }}>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="day">{t.sortDay}</option>
          <option value="prep">{t.sortPrep}</option>
          <option value="name">{t.sortName}</option>
        </select>
        <select value={filterPrep} onChange={e => setFilterPrep(e.target.value)} style={selectStyle}>
          <option value="all">{t.prepAll}</option>
          {t.prepMethods.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      {filteredItems.length === 0 && selectedEvent && (
        <div style={{ textAlign: "center", color: "#444", padding: 40, fontSize: 14 }}>{t.noItems}<br /><span style={{ fontSize: 12, color: "#333" }}>{t.noItemsHint}</span></div>
      )}
      {filteredItems.map(item => (
        <div key={item.id} style={{ background: item.done ? "#111" : "#1a1a26", border: "1px solid "+(item.done?"#ffffff05":"#ffffff0a"), borderRadius: 12, padding: "12px 14px", marginBottom: 8, opacity: item.done ? 0.5 : 1 }}>
          {editingItem?.id === item.id ? (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#60a5fa", marginBottom: 10 }}>{t.editItem}</div>
              <ItemForm item={editingItem} setter={setEditingItem} onSave={saveEditItem} onCancel={() => setEditingItem(null)} onDelete={() => { deleteItem(item.id); setEditingItem(null); }} t={t} useCat={useCat} userTags={userTags} toggleDay={toggleDay} toggleTag={toggleTag} daysLabel={daysLabel} />
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => toggleDone(item.id)} style={{ width: 44, height: 44, borderRadius: "50%", border: item.done?"none":"2px solid #3b82f6", background: item.done?"#3b82f6":"transparent", cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "white" }}>{item.done?"✓":""}</button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, textDecoration: item.done?"line-through":"none", color: item.done?"#444":"#f0ede8" }}>
                  {item.name}<span style={{ fontSize: 12, color: "#666", fontWeight: 400, marginLeft: 6 }}>×{item.qty}</span>
                </div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 3, display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ color: "#60a5fa" }}>{daysLabel(item.days)}</span>
                  <span>·</span>
                  <span style={{ color: prepColor(item.prep, t.prepMethods) }}>{item.prep}{item.prepWhere?`（${item.prepWhere}）`:""}</span>
                  {useCat && item.category && <><span>·</span><span>{item.category}</span></>}
                  {item.tags?.map(tag => <span key={tag} style={{ background: "#2a1f3d", color: "#c084fc", padding: "1px 7px", borderRadius: 8, fontSize: 10 }}>{tag}</span>)}
                </div>
              </div>
              <button onClick={() => setEditingItem({ ...item })} style={{ background: "#1e2030", border: "none", borderRadius: 8, color: "#888", fontSize: 14, cursor: "pointer", padding: "6px 8px", flexShrink: 0 }}>✎</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── Tab: Add ────────────────────────────────────────────
  const renderAdd = () => {
    if (!selectedEvent) {
      return (
        <div style={{ textAlign: "center", color: "#555", padding: 40 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 14 }}>{t.selectEvent}</div>
          <div style={{ fontSize: 12, marginTop: 6, color: "#444" }}>{t.selectEventHint}</div>
        </div>
      );
    }
    return (
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: "#60a5fa" }}>{t.addTo(selectedEvent.name)}</div>
        <ItemForm item={newItem} setter={setNewItem} onSave={addItem} onCancel={() => { setNewItem(emptyItem(t.prepMethods[0])); setTabIndex(1); }} t={t} useCat={useCat} userTags={userTags} toggleDay={toggleDay} toggleTag={toggleTag} daysLabel={daysLabel} />
      </div>
    );
  };

  // ── Tab: Settings ───────────────────────────────────────
  const renderSettings = () => (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t.settings}</div>

      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>{t.language}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {LANG_OPTIONS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); }} style={{ padding: "8px 14px", borderRadius: 20, border: "none", background: lang === l.code ? "#3b82f6" : "#1e2030", color: lang === l.code ? "white" : "#888", fontSize: 13, fontWeight: lang === l.code ? 700 : 400, cursor: "pointer" }}>{l.label}</button>
          ))}
        </div>
      </div>

      <div style={{ ...card, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{t.useCat}</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.useCatDesc}</div>
        </div>
        <button onClick={() => setUseCat(v => !v)} style={{ width: 48, height: 28, borderRadius: 14, border: "none", background: useCat ? "#3b82f6" : "#2a2d3e", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 4, left: useCat ? 24 : 4, transition: "left 0.2s" }} />
        </button>
      </div>

      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.manageTags}</div>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 12 }}>{t.manageTagsDesc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {userTags.map(tag => (
            <div key={tag} style={{ display: "flex", alignItems: "center", gap: 4, background: "#2a1f3d", borderRadius: 20, padding: "5px 10px" }}>
              <span style={{ fontSize: 12, color: "#c084fc" }}>{tag}</span>
              <button onClick={() => {
                setUserTags(p => p.filter(t => t !== tag));
                setEvents(p => p.map(ev => ({
                  ...ev,
                  items: ev.items.map(i => ({ ...i, tags: i.tags.filter(t => t !== tag) }))
                })));
              }} style={{ background: "none", border: "none", color: "#7c3aed", cursor: "pointer", fontSize: 13, padding: 0, lineHeight: 1 }}>✕</button>
            </div>
          ))}
          {userTags.length === 0 && <span style={{ fontSize: 12, color: "#444" }}>{t.noTags}</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder={t.newTag} value={newTagInput} onChange={e => setNewTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newTagInput.trim()) { setUserTags(p => [...p, newTagInput.trim()]); setNewTagInput(""); }}} style={{ ...inputStyle, marginBottom: 0, flex: 1 }} />
          <button onClick={() => { if (newTagInput.trim()) { setUserTags(p => [...p, newTagInput.trim()]); setNewTagInput(""); }}} style={{ ...pillBtn, flexShrink: 0 }}>{t.addTag}</button>
        </div>
      </div>
    </div>
  );

  const tabContents = [renderEvents(), renderItems(), renderAdd(), renderSettings()];

  return (
    <div style={{ fontFamily: lang === "ja" || lang === "zh" || lang === "ko" ? "'Hiragino Sans','Noto Sans JP',sans-serif" : "system-ui,sans-serif", background: "#0f0f13", minHeight: "100vh", color: "#f0ede8", maxWidth: 430, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)", padding: "20px 20px 0", borderBottom: "1px solid #ffffff10" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#60a5fa", letterSpacing: 3, textTransform: "uppercase", marginBottom: 2 }}>{t.appSub}</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>{t.appTitle}</div>
          </div>
          {tabIndex === 0 && <button onClick={() => setShowAddEvent(true)} style={pillBtn}>{t.addEvent}</button>}
          {tabIndex === 1 && <button onClick={() => setTabIndex(2)} style={pillBtn}>{t.addItem}</button>}
        </div>
        <div style={{ display: "flex" }}>
          {t.tabs.map((tab, i) => (
            <button key={i} onClick={() => setTabIndex(i)} style={{ flex: 1, background: "none", border: "none", color: tabIndex === i ? "#60a5fa" : "#555", padding: "10px 2px", fontSize: 11, fontWeight: tabIndex === i ? 700 : 400, borderBottom: tabIndex === i ? "2px solid #3b82f6" : "2px solid transparent", cursor: "pointer" }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        {tabContents[tabIndex]}
      </div>
    </div>
  );
}


const inputStyle = { width: "100%", background: "#0f0f13", border: "1px solid #ffffff15", borderRadius: 10, padding: "11px 14px", color: "#f0ede8", fontSize: 14, marginBottom: 8, boxSizing: "border-box", outline: "none" };
const selectStyle = { background: "#1e2030", border: "1px solid #ffffff10", borderRadius: 20, padding: "6px 10px", color: "#aaa", fontSize: 11, outline: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 };
const lbl = { display: "block", fontSize: 11, color: "#555", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" };
const pillBtn = { background: "linear-gradient(135deg,#2563eb,#3b82f6)", border: "none", borderRadius: 20, color: "white", padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" };
const card = { background: "#1a1a26", border: "1px solid #ffffff08", borderRadius: 16, padding: 16, marginBottom: 14 };
