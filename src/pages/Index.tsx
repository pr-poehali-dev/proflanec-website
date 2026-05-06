import { useState } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/files/2e0f047d-199e-4f15-87cc-7e6927e7de77.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/bf099e43-b141-480c-a9e9-c917937c2e94/files/4cec1991-66ba-416d-994b-0bed14e16ebf.jpg";
const BLUEPRINT_IMG = "https://cdn.poehali.dev/projects/bf099e43-b141-480c-a9e9-c917937c2e94/files/1a5e1c03-7e13-454b-832d-193e5cd7c077.jpg";
const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/bf099e43-b141-480c-a9e9-c917937c2e94/files/7d7f5a62-3c64-453c-ada3-9b552a89be82.jpg";

type Section = "home" | "about" | "custom" | "catalog" | "valve" | "contacts";

type CatalogCategory =
  | "all"
  | "flanges"
  | "flanged-parts"
  | "welded-parts"
  | "filters"
  | "registers"
  | "valves"
  | "supports";

const categoryLabels: Record<CatalogCategory, string> = {
  all: "Все изделия",
  flanges: "Фланцы",
  "flanged-parts": "Фланцевые детали",
  "welded-parts": "Детали под приварку",
  filters: "Грязевики и воздухосборники",
  registers: "Регистры отопления",
  valves: "Запорная арматура",
  supports: "Опоры трубопроводов",
};

interface CatalogItem {
  id: number;
  name: string;
  category: CatalogCategory;
  gost?: string;
  dn?: string;
  pressure?: string;
  desc: string;
}

const catalogItems: CatalogItem[] = [
  // ФЛАНЦЫ
  { id: 1, name: "Фланец плоский приварной", category: "flanges", gost: "ГОСТ 12820-80 / ГОСТ 33259", dn: "Ду 15–1400", pressure: "Ру 0,6–2,5 МПа", desc: "Для соединения труб с арматурой и оборудованием при невысоком давлении. Простота монтажа и доступная стоимость." },
  { id: 2, name: "Фланец воротниковый (встык)", category: "flanges", gost: "ГОСТ 12821-80 / ГОСТ 33259", dn: "Ду 15–1000", pressure: "Ру 1,0–20,0 МПа", desc: "Для соединения трубопроводов под высоким давлением. Воротниковая конструкция равномерно распределяет нагрузку." },
  { id: 3, name: "Фланец глухой", category: "flanges", gost: "ГОСТ 12836-67 / ГОСТ 33259", dn: "Ду 15–1200", pressure: "Ру 0,6–20,0 МПа", desc: "Для герметичного перекрытия трубопроводов и оборудования. Применяется при испытаниях и временных перекрытиях." },
  { id: 4, name: "Фланец свободный на приварном кольце", category: "flanges", gost: "ГОСТ 12822-80 / ГОСТ 33259", dn: "Ду 15–600", pressure: "Ру 0,6–2,5 МПа", desc: "Для соединений, где требуется частая разборка узлов или компенсация смещений труб." },
  { id: 5, name: "Фланец пожарный", category: "flanges", gost: "ГОСТ 28352-89", dn: "Ду 50–200", pressure: "Ру 1,0–1,6 МПа", desc: "Для монтажа пожарных гидрантов и оборудования в системах противопожарного водоснабжения." },
  { id: 6, name: "Фланец по ASME B16.5 / DIN / EN 1092-1", category: "flanges", gost: "ASME B16.5 / DIN 2631–2638 / ANSI", dn: "DN 15–600", pressure: "Class 150–2500", desc: "Фланцы по международным стандартам для экспортных проектов и импортного оборудования. Стали A105, A182 F304/F316, A350 LF2." },

  // ФЛАНЦЕВЫЕ ДЕТАЛИ
  { id: 7, name: "Тройник фланцевый", category: "flanged-parts", dn: "Ду 50–1000", pressure: "Ру 1,0–2,5 МПа", desc: "Для организации ответвлений в трубопроводных системах. Фланцевое соединение обеспечивает разборный монтаж без сварочных работ." },
  { id: 8, name: "Крест фланцевый", category: "flanged-parts", dn: "Ду 50–600", pressure: "Ру 1,0–1,6 МПа", desc: "Для соединения четырёх трубопроводов в одном узле. Фланцевое соединение обеспечивает разборный монтаж и обслуживание." },
  { id: 9, name: "Переход фланцевый", category: "flanged-parts", dn: "Ду 25–800", pressure: "Ру 1,0–2,5 МПа", desc: "Для соединения трубопроводов с различными условными диаметрами. Фланцевое соединение обеспечивает разборный монтаж узла." },
  { id: 10, name: "Отвод фланцевый", category: "flanged-parts", dn: "Ду 25–600", pressure: "Ру 1,0–2,5 МПа", desc: "Для изменения направления трубопровода. Конструкция с фланцами обеспечивает удобный монтаж и демонтаж." },
  { id: 11, name: "Фланцевая труба (катушка)", category: "flanged-parts", dn: "Ду 25–1200", pressure: "Ру 0,6–4,0 МПа", desc: "Элементы трубопроводной системы, оснащённые фланцами для быстрого и надёжного соединения с оборудованием и арматурой." },
  { id: 12, name: "Патрубок фланцевый", category: "flanged-parts", dn: "Ду 15–600", pressure: "Ру 0,6–4,0 МПа", desc: "Для подключения оборудования или трубопроводов с фланцевым соединением. Применяется в системах отопления, водоснабжения, нефтегазопроводах." },
  { id: 13, name: "Патрубок переходной фланцевый", category: "flanged-parts", dn: "Ду 25–600", pressure: "Ру 0,6–2,5 МПа", desc: "Для соединения трубопроводов разного диаметра. Обеспечивает герметичное и прочное соединение при изменении размеров магистрали." },
  { id: 14, name: "Патрубок фланцево-резьбовой", category: "flanged-parts", dn: "Ду 15–150", pressure: "Ру 1,0–1,6 МПа", desc: "Комбинированный элемент для соединения фланцевых трубопроводов с резьбовыми соединениями. Удобен при модернизации систем." },
  { id: 15, name: "Катушка фланцевая", category: "flanged-parts", dn: "Ду 25–1000", pressure: "Ру 0,6–4,0 МПа", desc: "Для соединения трубопроводных систем, удлинения магистралей и компенсации расстояний между оборудованием без сварочных операций." },
  { id: 16, name: "Заглушка фланцевая / межфланцевая / поворотная", category: "flanged-parts", dn: "Ду 15–1000", pressure: "Ру 0,6–4,0 МПа", desc: "Обтюраторы и дроссельные шайбы для временного перекрытия или дросселирования потока. Монтаж без демонтажа трубопровода." },

  // ДЕТАЛИ ПОД ПРИВАРКУ
  { id: 17, name: "Отвод приварной", category: "welded-parts", gost: "ГОСТ 17375-2001", dn: "Ду 15–1400", pressure: "Ру до 20 МПа", desc: "Обеспечивает плавное изменение направления потока в трубопроводе, снижая гидравлические потери. Углы 45°, 90°, 180°." },
  { id: 18, name: "Тройник под приварку", category: "welded-parts", gost: "ГОСТ 17376-2001", dn: "Ду 15–1400", pressure: "Ру до 20 МПа", desc: "Для ответвления потока под углом 90°. Используется в системах водоснабжения, отопления, нефтегазопроводах." },
  { id: 19, name: "Переход под приварку", category: "welded-parts", gost: "ГОСТ 17378-2001", dn: "Ду 15–1000", pressure: "Ру до 20 МПа", desc: "Для соединения труб разных диаметров. Обеспечивает плавный переход от большего диаметра к меньшему." },
  { id: 20, name: "Крест приварной", category: "welded-parts", dn: "Ду 50–600", pressure: "Ру до 16 МПа", desc: "Для разветвления или объединения четырёх направлений трубопровода. Применяется в инженерных сетях высокого давления и температур." },
  { id: 21, name: "Заглушка приварная", category: "welded-parts", gost: "ГОСТ 17379-2001", dn: "Ду 15–600", pressure: "Ру до 20 МПа", desc: "Для герметичного перекрытия трубопровода при ремонтах, гидравлических испытаниях или временном выводе из эксплуатации." },
  { id: 22, name: "Заглушка приварная с рёбрами жёсткости", category: "welded-parts", dn: "Ду 300–1400", pressure: "Ру до 20 МПа", desc: "Для перекрытия трубопровода большого диаметра. Рёбра жёсткости обеспечивают повышенную прочность при высоком давлении." },
  { id: 23, name: "Патрубок под приварку", category: "welded-parts", dn: "Ду 15–600", pressure: "Ру до 16 МПа", desc: "Для соединения трубопроводов, когда требуется приварка с одной стороны и фланцевое соединение с другой." },

  // ГРЯЗЕВИКИ И ВОЗДУХОСБОРНИКИ
  { id: 24, name: "Грязевик абонентский с прочистной пробкой", category: "filters", dn: "Ду 50–500", pressure: "Ру 1,0–1,6 МПа", desc: "Фильтрация воды от средних и крупных частиц. Пробка позволяет быстро прочистить фильтр без демонтажа. Тип соединения: фланцевое или под приварку." },
  { id: 25, name: "Грязевик абонентский с фланцем для прочистки", category: "filters", dn: "Ду 50–500", pressure: "Ру 1,0–1,6 МПа", desc: "Механическая очистка воды, предотвращение отложений. Фланец для прочистки обеспечивает лёгкий доступ к фильтру и упрощает обслуживание." },
  { id: 26, name: "Грязевик теплового пункта (ГТП)", category: "filters", dn: "Ду 50–400", pressure: "Ру 1,0–1,6 МПа", desc: "Фильтрация воды от механических примесей в системах водяного отопления. Устанавливаются на вводе в тепловых пунктах, котельных, элеваторных узлах." },
  { id: 27, name: "Воздухосборник", category: "filters", dn: "Ду 100–500", pressure: "Ру 0,6–1,6 МПа", desc: "Удаление воздуха и газовых включений, предотвращение кавитации и коррозии. Тип днища: эллиптическое (рекомендуется) или плоское. Возможна комплектация воздухоотводчиками." },

  // РЕГИСТРЫ
  { id: 28, name: "Регистр сегментный", category: "registers", dn: "Ду 50–150", pressure: "Ру 0,6–1,6 МПа", desc: "Для обогрева воздуха в жилых, офисных, производственных и складских помещениях. Обеспечивает эффективный теплообмен и равномерное распределение тепла вдоль стен." },
  { id: 29, name: "Регистр змеевиковый", category: "registers", dn: "Ду 25–100", pressure: "Ру 0,6–1,6 МПа", desc: "Для нагрева или охлаждения жидкостей и газов в технологических процессах. Применяется в теплообменниках, сушильных шкафах, ёмкостях. Змеевик увеличивает площадь теплообмена при компактных размерах." },

  // ОПОРЫ ТРУБОПРОВОДОВ
  { id: 30, name: "Опоры трубопроводов", category: "supports", gost: "ГОСТ 14911-82 / ОСТ 36-17-85 / по чертежам", dn: "Ду 15–1400", desc: "Неподвижные, скользящие, катковые и пружинные опоры для надземной и подземной прокладки трубопроводов. Изготовление по ГОСТ и чертежам заказчика." },
];

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog", label: "Каталог" },
  { id: "valve", label: "Запорная арматура" },
  { id: "custom", label: "По чертежам" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CatalogCategory>("all");

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredItems = categoryFilter === "all"
    ? catalogItems
    : catalogItems.filter((item) => item.category === categoryFilter);

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => navigate("home")} className="flex items-center gap-3 group flex-shrink-0">
              <img src={LOGO_URL} alt="ПРОФЛАНЕЦ" className="w-10 h-10 object-contain flex-shrink-0" />
              <div className="text-left hidden sm:block">
                <div className="font-oswald text-lg font-semibold text-navy leading-none tracking-wide uppercase">ПРОФЛАНЕЦ</div>
                <div className="font-ibm text-[10px] text-steel tracking-widest uppercase leading-none mt-0.5">ТПК Екатеринбург</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`font-oswald text-xs tracking-widest uppercase transition-colors duration-200 ${activeSection === item.id ? "text-blue-brand border-b-2 border-blue-brand pb-0.5" : "text-steel hover:text-blue-brand"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="tel:+73432000000" className="hidden md:flex items-center gap-2 font-oswald text-sm font-medium text-navy hover:text-blue-brand transition-colors">
                <Icon name="Phone" size={14} className="text-blue-brand" />
                +7 (343) 200-00-00
              </a>
              <button
                onClick={() => navigate("contacts")}
                className="hidden md:flex items-center gap-2 bg-blue-brand text-white font-ibm text-xs font-medium px-4 py-2 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider"
              >
                Запросить цену
              </button>
              <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-navy" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`font-oswald text-sm text-left py-2.5 border-b border-border last:border-0 uppercase tracking-widest ${activeSection === item.id ? "text-blue-brand" : "text-steel"}`}
              >
                {item.label}
              </button>
            ))}
            <a href="tel:+73432000000" className="font-ibm text-sm text-navy font-medium pt-2 flex items-center gap-2">
              <Icon name="Phone" size={14} className="text-blue-brand" />+7 (343) 200-00-00
            </a>
          </div>
        )}
      </header>

      {activeSection === "home" && <HomeSection onNavigate={navigate} />}
      {activeSection === "about" && <AboutSection onNavigate={navigate} />}
      {activeSection === "catalog" && (
        <CatalogSection
          filteredItems={filteredItems}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          onNavigate={navigate}
        />
      )}
      {activeSection === "valve" && <ValveSection onNavigate={navigate} />}
      {activeSection === "custom" && <CustomSection onNavigate={navigate} />}
      {activeSection === "contacts" && <ContactsSection />}

      {/* FOOTER */}
      <footer className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <img src={LOGO_URL} alt="ПРОФЛАНЕЦ" className="w-10 h-10 object-contain bg-white rounded-full p-0.5" />
                <div>
                  <div className="font-oswald text-base tracking-wide uppercase">ПРОФЛАНЕЦ</div>
                  <div className="font-ibm text-[10px] text-slate-400 tracking-wider uppercase">ТПК Екатеринбург</div>
                </div>
              </div>
              <p className="font-ibm text-sm text-slate-400 leading-relaxed">ООО «ПРОФЛАНЕЦ» — торгово-производственная компания. Производство и поставка трубопроводной арматуры по ГОСТ и международным стандартам.</p>
            </div>
            <div>
              <div className="font-oswald text-sm tracking-widest uppercase text-slate-400 mb-3">Каталог</div>
              <div className="flex flex-col gap-1.5">
                {(Object.entries(categoryLabels) as [CatalogCategory, string][]).filter(([k]) => k !== "all").map(([, label]) => (
                  <button key={label} onClick={() => { setCategoryFilter("all"); navigate("catalog"); }} className="font-ibm text-sm text-slate-300 hover:text-white text-left transition-colors">{label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-oswald text-sm tracking-widest uppercase text-slate-400 mb-3">Навигация</div>
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => navigate(item.id)} className="font-ibm text-sm text-slate-300 hover:text-white text-left transition-colors">{item.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-oswald text-sm tracking-widest uppercase text-slate-400 mb-3">Контакты</div>
              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-slate-400 flex-shrink-0" />+7 (343) 200-00-00</div>
                <div className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-slate-400 flex-shrink-0" />info@proflanec.ru</div>
                <div className="flex items-start gap-2"><Icon name="MapPin" size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />г. Екатеринбург</div>
                <div className="flex items-center gap-2"><Icon name="Clock" size={14} className="text-slate-400 flex-shrink-0" />Пн–Пт 09:00–18:00</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-ibm text-xs text-slate-500">© 2024 ООО «ПРОФЛАНЕЦ». Все права защищены.</p>
            <p className="font-ibm text-xs text-slate-500">Производство фланцев и трубопроводной арматуры в Екатеринбурге</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── HOME ── */
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden hero-pattern grid-pattern min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Производство" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="rule-line"></span>
              <span className="font-ibm text-xs tracking-widest uppercase text-blue-300">ООО «ПРОФЛАНЕЦ» — Екатеринбург</span>
            </div>
            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6 animate-slide-up stagger-1">
              Производство<br />фланцев и<br />трубопроводной<br />арматуры
            </h1>
            <p className="font-ibm text-base text-slate-300 leading-relaxed mb-8 max-w-xl animate-slide-up stagger-2">
              Фланцы, фланцевые детали, грязевики, регистры, опоры — по ГОСТ, ASME, DIN. Изготовление от 1 шт. Доставка по России и СНГ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up stagger-3">
              <button onClick={() => onNavigate("catalog")} className="flex items-center justify-center gap-2 bg-white text-navy font-oswald text-sm font-medium px-6 py-3 hover:bg-slate-100 transition-colors uppercase tracking-wider">
                <Icon name="BookOpen" size={16} />Каталог продукции
              </button>
              <button onClick={() => onNavigate("contacts")} className="flex items-center justify-center gap-2 border border-white/40 text-white font-oswald text-sm font-medium px-6 py-3 hover:bg-white/10 transition-colors uppercase tracking-wider">
                <Icon name="MessageSquare" size={16} />Запросить цену
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: "30+", label: "Позиций в каталоге" },
              { value: "ГОСТ / ASME / DIN", label: "Стандарты производства" },
              { value: "от 1 шт", label: "Минимальный заказ" },
              { value: "от 3 дней", label: "Срок изготовления" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 sm:px-8 text-center">
                <div className="font-oswald text-2xl font-semibold text-blue-brand">{stat.value}</div>
                <div className="font-ibm text-xs text-steel uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product categories overview */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Что мы производим</span>
          </div>
          <h2 className="font-oswald text-3xl md:text-4xl font-medium text-navy mb-10">Основные категории</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "CircleDot" as const, title: "Фланцы", desc: "Плоские, воротниковые, глухие, свободные, пожарные. ГОСТ, ASME, DIN, EN.", section: "catalog" as Section },
              { icon: "GitMerge" as const, title: "Фланцевые детали", desc: "Тройники, кресты, отводы, переходы, патрубки, катушки, заглушки.", section: "catalog" as Section },
              { icon: "Layers" as const, title: "Детали под приварку", desc: "Отводы, тройники, переходы, кресты, заглушки по ГОСТ 17375-2001.", section: "catalog" as Section },
              { icon: "Filter" as const, title: "Грязевики и воздухосборники", desc: "Абонентские грязевики, ГТП, воздухосборники для тепловых пунктов.", section: "catalog" as Section },
              { icon: "Flame" as const, title: "Регистры отопления", desc: "Сегментные и змеевиковые регистры для промышленных помещений.", section: "catalog" as Section },
              { icon: "Lock" as const, title: "Запорная арматура", desc: "Задвижки, шаровые краны, обратные клапаны, вентили.", section: "valve" as Section },
              { icon: "MoveHorizontal" as const, title: "Опоры трубопроводов", desc: "Неподвижные, скользящие, катковые по ГОСТ и чертежам заказчика.", section: "catalog" as Section },
              { icon: "Wrench" as const, title: "По чертежам", desc: "Нестандартные фланцы, детали и узлы по ТЗ заказчика. От 1 шт.", section: "custom" as Section },
            ].map((cat) => (
              <div key={cat.title} className="catalog-card bg-white border border-border p-5 group cursor-pointer" onClick={() => onNavigate(cat.section)}>
                <div className="w-9 h-9 bg-blue-brand/10 flex items-center justify-center mb-3">
                  <Icon name={cat.icon} size={18} className="text-blue-brand" />
                </div>
                <h3 className="font-oswald text-base font-medium text-navy mb-1.5 group-hover:text-blue-brand transition-colors">{cat.title}</h3>
                <p className="font-ibm text-xs text-steel leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards block */}
      <section className="py-14 bg-white border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="rule-line"></span>
                <span className="font-ibm text-xs tracking-widest uppercase text-steel">Стандарты</span>
              </div>
              <h2 className="font-oswald text-3xl font-medium text-navy mb-4">Производим по российским и международным стандартам</h2>
              <p className="font-ibm text-sm text-steel leading-relaxed mb-6">Вся продукция сопровождается сертификатами качества, паспортами и протоколами испытаний. Подбираем материал с учётом условий эксплуатации.</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {["ГОСТ 33259", "ГОСТ 12820", "ГОСТ 12821", "ASME B16.5", "DIN 2631–2638", "EN 1092-1", "ANSI", "ГОСТ 17375", "По чертежам"].map((std) => (
                  <div key={std} className="bg-secondary/60 border border-border text-center py-2 px-2 font-ibm text-xs font-medium text-steel">{std}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {["Сталь 20", "09Г2С", "12Х18Н10Т", "13ХФА", "A105", "A182 F304/F316", "A350 LF2"].map((mat) => (
                  <span key={mat} className="font-ibm text-xs text-blue-brand border border-blue-brand/30 bg-blue-brand/5 px-2.5 py-1">{mat}</span>
                ))}
              </div>
            </div>
            <div>
              <img src={BLUEPRINT_IMG} alt="Чертёж" className="w-full aspect-[4/3] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 md:py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-slate-400">Преимущества</span>
          </div>
          <h2 className="font-oswald text-3xl md:text-4xl font-medium text-white mb-10">Почему выбирают ПРОФЛАНЕЦ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700">
            {[
              { icon: "ShieldCheck" as const, title: "Гарантия качества", desc: "Соответствие ГОСТ, ТУ и международным стандартам. Сертификаты на все партии." },
              { icon: "Package" as const, title: "От 1 штуки", desc: "Минимальный заказ — 1 шт. Работаем с единичными заказами и крупным оптом." },
              { icon: "Clock" as const, title: "От 3 дней", desc: "Быстрая обработка заказа. Типовые изделия — со склада или срочное изготовление." },
              { icon: "Truck" as const, title: "Доставка по России", desc: "Поставка по России и странам СНГ транспортными компаниями. Самовывоз из Екатеринбурга." },
            ].map((adv) => (
              <div key={adv.title} className="bg-navy p-6">
                <div className="w-10 h-10 border border-slate-600 flex items-center justify-center mb-4">
                  <Icon name={adv.icon} size={18} className="text-blue-300" />
                </div>
                <h3 className="font-oswald text-lg font-medium text-white mb-2">{adv.title}</h3>
                <p className="font-ibm text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-oswald text-3xl font-medium text-navy mb-4">Готовы к сотрудничеству?</h2>
          <p className="font-ibm text-sm text-steel mb-8">Отправьте запрос или чертёж — менеджер ответит в течение 30 минут и подберёт оптимальное решение.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("contacts")} className="inline-flex items-center justify-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-8 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
              <Icon name="Mail" size={16} />Отправить запрос
            </button>
            <button onClick={() => onNavigate("catalog")} className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-oswald text-sm font-medium px-8 py-3 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider">
              <Icon name="BookOpen" size={16} />Открыть каталог
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ABOUT ── */
function AboutSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">О компании</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">ООО «ПРОФЛАНЕЦ»</h1>
          <p className="font-ibm text-sm text-steel mt-2">Торгово-производственная компания, Екатеринбург</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
          <div>
            <p className="font-ibm text-sm text-steel leading-relaxed mb-4">
              <strong className="text-navy">ООО «ПРОФЛАНЕЦ»</strong> — торгово-производственная компания в Екатеринбурге, специализирующаяся на производстве и поставке фланцев, деталей трубопроводов и смежной арматуры для промышленности, энергетики, строительства и жилищно-коммунального хозяйства.
            </p>
            <p className="font-ibm text-sm text-steel leading-relaxed mb-4">
              Мы производим продукцию по российским стандартам ГОСТ и международным стандартам ASME, DIN, EN. Все изделия сопровождаются сертификатами качества, паспортами и протоколами испытаний.
            </p>
            <p className="font-ibm text-sm text-steel leading-relaxed mb-6">
              Минимальный заказ — от 1 штуки. Срок изготовления — от 3 дней. Поставка по России и странам СНГ.
            </p>
            <ul className="flex flex-col gap-3">
              {["Соответствие стандартам ГОСТ, ASME, DIN, EN", "Изготовление по чертежам и ТЗ заказчика", "Материалы: Ст20, 09Г2С, 12Х18Н10Т, A105, A182 и другие", "Быстрая обработка заказа — от 3 дней", "Сертификаты качества и паспорта на изделия"].map((item) => (
                <li key={item} className="flex items-start gap-3 font-ibm text-sm text-steel">
                  <Icon name="Check" size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={HERO_IMG} alt="Производство" className="w-full aspect-video object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "Building2" as const, title: "Собственное производство", desc: "Полный производственный цикл на собственных мощностях в Екатеринбурге." },
            { icon: "FileCheck" as const, title: "Сертификация", desc: "Вся продукция сопровождается сертификатами качества, паспортами и протоколами испытаний." },
            { icon: "Truck" as const, title: "Доставка по России и СНГ", desc: "Доставка транспортными компаниями. Самовывоз из Екатеринбурга." },
            { icon: "Package" as const, title: "От 1 штуки", desc: "Принимаем единичные заказы и крупные партии. Гибкая система скидок при объёме." },
            { icon: "Clock" as const, title: "Сроки от 3 дней", desc: "Типовые изделия — со склада или срочное изготовление. Нестандартные — по согласованию." },
            { icon: "Globe" as const, title: "ГОСТ и международные стандарты", desc: "ГОСТ 33259, ASME B16.5, DIN 2631–2638, EN 1092-1, ANSI." },
          ].map((item) => (
            <div key={item.title} className="bg-secondary/40 border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-brand/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={16} className="text-blue-brand" />
                </div>
                <h3 className="font-oswald text-base font-medium text-navy">{item.title}</h3>
              </div>
              <p className="font-ibm text-sm text-steel leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 text-center">
          <button onClick={() => onNavigate("contacts")} className="inline-flex items-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-8 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
            Связаться с нами<Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

/* ── CATALOG ── */
interface CatalogSectionProps {
  filteredItems: CatalogItem[];
  categoryFilter: CatalogCategory;
  setCategoryFilter: (v: CatalogCategory) => void;
  onNavigate: (s: Section) => void;
}

function CatalogSection({ filteredItems, categoryFilter, setCategoryFilter, onNavigate }: CatalogSectionProps) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Продукция</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Каталог продукции</h1>
          <p className="font-ibm text-sm text-steel mt-2">Производство по ГОСТ, ASME, DIN. Изготовление от 1 штуки.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filter tabs */}
        <div className="bg-white border border-border p-4 mb-8">
          <div className="font-ibm text-xs tracking-widest uppercase text-steel mb-3">Категория</div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as CatalogCategory[]).map((key) => (
              <button key={key} onClick={() => setCategoryFilter(key)} className={`filter-btn ${categoryFilter === key ? "active" : ""}`}>
                {categoryLabels[key]}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
            <span className="font-ibm text-xs text-steel">Показано: <strong className="text-navy">{filteredItems.length}</strong> позиций</span>
            {categoryFilter !== "all" && (
              <button onClick={() => setCategoryFilter("all")} className="font-ibm text-xs text-blue-brand hover:underline flex items-center gap-1">
                <Icon name="RotateCcw" size={12} />Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div key={item.id} className="catalog-card bg-white border border-border p-5 group">
              <div className="flex items-start justify-between mb-3">
                <span className="font-ibm text-[10px] uppercase tracking-widest text-white bg-blue-brand px-2 py-0.5">
                  {categoryLabels[item.category]}
                </span>
                {item.gost && (
                  <span className="font-ibm text-[10px] text-steel border border-border px-2 py-0.5 text-right leading-tight">{item.gost.split(" / ")[0]}</span>
                )}
              </div>
              <h3 className="font-oswald text-lg font-medium text-navy mb-2 group-hover:text-blue-brand transition-colors">{item.name}</h3>
              <p className="font-ibm text-xs text-steel leading-relaxed mb-4">{item.desc}</p>
              {(item.dn || item.pressure) && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {item.dn && (
                    <div className="bg-secondary/60 px-3 py-2">
                      <div className="font-ibm text-[10px] uppercase tracking-wider text-steel">Ду</div>
                      <div className="font-ibm text-xs font-medium text-navy">{item.dn}</div>
                    </div>
                  )}
                  {item.pressure && (
                    <div className="bg-secondary/60 px-3 py-2">
                      <div className="font-ibm text-[10px] uppercase tracking-wider text-steel">Давление</div>
                      <div className="font-ibm text-xs font-medium text-navy">{item.pressure}</div>
                    </div>
                  )}
                </div>
              )}
              <button onClick={() => onNavigate("contacts")} className="font-ibm text-xs text-blue-brand flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                Запросить цену<Icon name="ArrowRight" size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-border bg-secondary/30 p-8 text-center">
          <p className="font-ibm text-sm text-steel mb-4">Не нашли нужную позицию? Изготовим по вашим чертежам или подберём аналог.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("custom")} className="inline-flex items-center justify-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-6 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
              Изготовление по чертежам
            </button>
            <button onClick={() => onNavigate("contacts")} className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-oswald text-sm font-medium px-6 py-3 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider">
              Связаться с менеджером
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── VALVE ── */
function ValveSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Продукция</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Запорная арматура</h1>
          <p className="font-ibm text-sm text-steel mt-2">Поставка и комплектация для трубопроводных систем</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14 items-center">
          <div>
            <p className="font-ibm text-sm text-steel leading-relaxed mb-6">
              ПРОФЛАНЕЦ осуществляет поставку запорной арматуры ведущих производителей для комплектации трубопроводных систем в промышленности, энергетике и ЖКХ. Мы подбираем арматуру под конкретные условия эксплуатации — давление, температуру, рабочую среду.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Подбор арматуры по параметрам системы",
                "Поставка под заказ и со склада",
                "Комплектация совместно с фланцами и деталями трубопровода",
                "Сертификаты и паспорта качества",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-ibm text-sm text-steel">
                  <Icon name="Check" size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={PRODUCTS_IMG} alt="Запорная арматура" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { icon: "Minus" as const, title: "Задвижки", desc: "Клиновые и параллельные задвижки фланцевые и под приварку. Стальные и чугунные. Ду 50–1200, Ру 1,0–16,0 МПа. ГОСТ 9698, 9697, 12816." },
            { icon: "Circle" as const, title: "Шаровые краны", desc: "Шаровые краны полнопроходные и стандартнопроходные. Фланцевые, муфтовые, под приварку. Ду 15–400, Ру 1,6–10,0 МПа." },
            { icon: "ArrowRight" as const, title: "Обратные клапаны", desc: "Обратные клапаны подъёмные, поворотные, дисковые. Фланцевые, муфтовые. Предотвращают обратный поток среды. Ду 15–600." },
            { icon: "Sliders" as const, title: "Вентили", desc: "Вентили запорные и регулирующие. Фланцевые и муфтовые. Стальные, чугунные, из нержавеющей стали. Ду 10–250, Ру 1,6–10,0 МПа." },
            { icon: "Gauge" as const, title: "Регулирующая арматура", desc: "Регуляторы давления, регуляторы расхода, балансировочные клапаны для систем тепло- и водоснабжения." },
            { icon: "Shield" as const, title: "Предохранительная арматура", desc: "Предохранительные клапаны, регуляторы давления «до себя» и «после себя». Защита системы от превышения давления." },
          ].map((item) => (
            <div key={item.title} className="catalog-card bg-white border border-border p-5 group">
              <div className="w-9 h-9 bg-blue-brand/10 flex items-center justify-center mb-3">
                <Icon name={item.icon} size={18} className="text-blue-brand" />
              </div>
              <h3 className="font-oswald text-lg font-medium text-navy mb-2 group-hover:text-blue-brand transition-colors">{item.title}</h3>
              <p className="font-ibm text-xs text-steel leading-relaxed mb-4">{item.desc}</p>
              <button onClick={() => onNavigate("contacts")} className="font-ibm text-xs text-blue-brand flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                Запросить цену<Icon name="ArrowRight" size={12} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-navy p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="font-oswald text-2xl font-medium mb-3">Комплектная поставка</h2>
              <p className="font-ibm text-sm text-slate-300 leading-relaxed">
                Мы поставляем арматуру совместно с фланцами, крепёжом, прокладками и деталями трубопровода — вы получаете готовый комплект для монтажа.
              </p>
            </div>
            <div className="text-center md:text-right">
              <button onClick={() => onNavigate("contacts")} className="inline-flex items-center gap-2 bg-white text-navy font-oswald text-sm font-medium px-8 py-3 hover:bg-slate-100 transition-colors uppercase tracking-wider">
                Запросить комплектацию<Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── CUSTOM ── */
function CustomSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Услуги</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Изготовление по чертежам</h1>
          <p className="font-ibm text-sm text-steel mt-2 max-w-xl">Нестандартные фланцы, детали трубопровода и узлы по техническому заданию заказчика.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-14">
          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Что изготавливаем нестандартно</h2>
            <div className="flex flex-col gap-3 mb-8">
              {[
                "Фланцы нестандартных размеров и давлений",
                "Фланцы по чертежам и эскизам заказчика",
                "Нестандартные детали трубопроводов",
                "Фланцевые элементы для оборудования и аппаратов",
                "Узлы трубопроводов по проектной документации",
                "Опоры трубопроводов по чертежам",
                "Грязевики и воздухосборники нестандартных размеров",
                "Регистры отопления по нестандартным размерам помещения",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 font-ibm text-sm text-steel">
                  <Icon name="Check" size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />{item}
                </div>
              ))}
            </div>

            <h2 className="font-oswald text-2xl font-medium text-navy mb-5">Порядок работы</h2>
            <div className="flex flex-col gap-5">
              {[
                { step: "01", title: "Передача ТЗ или чертежа", desc: "Отправляете чертёж или техническое задание в любом формате: DWG, PDF, DXF, STEP, IGES или описание." },
                { step: "02", title: "Расчёт и КП за 24 часа", desc: "Инженеры рассчитывают стоимость и сроки, направляют коммерческое предложение." },
                { step: "03", title: "Согласование и договор", desc: "Согласовываем материалы, допуски, требования к контролю качества, заключаем договор." },
                { step: "04", title: "Изготовление", desc: "Производство с промежуточным контролем. Фото по запросу." },
                { step: "05", title: "Отгрузка с документами", desc: "Сертификаты качества, паспорта, протоколы испытаний." },
              ].map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="font-oswald text-3xl font-light text-blue-brand/30 leading-none flex-shrink-0 w-10">{step.step}</div>
                  <div>
                    <h3 className="font-oswald text-base font-medium text-navy mb-1">{step.title}</h3>
                    <p className="font-ibm text-sm text-steel leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img src={BLUEPRINT_IMG} alt="Чертёж" className="w-full aspect-[4/3] object-cover mb-6" />
            <div className="bg-blue-brand/5 border border-blue-brand/20 p-5 mb-5">
              <h3 className="font-oswald text-base font-medium text-navy mb-3">Форматы документации</h3>
              <div className="grid grid-cols-3 gap-2">
                {["DWG", "DXF", "PDF", "STEP", "IGES", "JPEG"].map((fmt) => (
                  <div key={fmt} className="bg-white border border-border text-center py-2 font-ibm text-xs font-medium text-steel tracking-wider">{fmt}</div>
                ))}
              </div>
            </div>
            <div className="bg-secondary/60 border border-border p-5">
              <h3 className="font-oswald text-base font-medium text-navy mb-3">Применяемые материалы</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Ст20", "09Г2С", "13ХФА", "12Х18Н10Т", "08Х18Н10Т", "A105", "A350 LF2", "A182 F304/316"].map((mat) => (
                  <div key={mat} className="font-ibm text-xs text-steel py-1 border-b border-border last:border-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-brand rounded-full flex-shrink-0"></span>{mat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-navy p-8 text-white text-center">
          <h2 className="font-oswald text-2xl font-medium mb-3">Отправьте чертёж — КП за 24 часа</h2>
          <p className="font-ibm text-sm text-slate-300 mb-6">Расчёт стоимости и сроков бесплатно. Минимальный заказ от 1 шт.</p>
          <button onClick={() => onNavigate("contacts")} className="inline-flex items-center gap-2 bg-white text-navy font-oswald text-sm font-medium px-8 py-3 hover:bg-slate-100 transition-colors uppercase tracking-wider">
            Отправить запрос<Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

/* ── CONTACTS ── */
function ContactsSection() {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Контакты</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Связаться с нами</h1>
          <p className="font-ibm text-sm text-steel mt-2">ООО «ПРОФЛАНЕЦ» — Екатеринбург</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Контактная информация</h2>
            <div className="flex flex-col gap-5 mb-8">
              {[
                { icon: "Phone" as const, label: "Телефон", value: "+7 (343) 200-00-00" },
                { icon: "Phone" as const, label: "Отдел продаж", value: "+7 (343) 200-00-01" },
                { icon: "Mail" as const, label: "E-mail", value: "info@proflanec.ru" },
                { icon: "Mail" as const, label: "Технический отдел", value: "tech@proflanec.ru" },
                { icon: "MapPin" as const, label: "Адрес", value: "г. Екатеринбург, ул. Производственная, д. 1" },
                { icon: "Clock" as const, label: "Режим работы", value: "Пн–Пт: 09:00–18:00 (МСК+2)" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={14} className="text-blue-brand" />
                  </div>
                  <div>
                    <div className="font-ibm text-[10px] uppercase tracking-widest text-steel mb-0.5">{c.label}</div>
                    <div className="font-ibm text-sm font-medium text-navy">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/60 border border-border p-5">
              <h3 className="font-oswald text-base font-medium text-navy mb-3">Реквизиты</h3>
              <div className="flex flex-col gap-2 font-ibm text-sm text-steel">
                {[["Полное наименование", 'ООО «ПРОФЛАНЕЦ»'], ["ИНН", "6600000000"], ["КПП", "660000000"], ["ОГРН", "1060000000000"], ["Юр. адрес", "г. Екатеринбург"]].map(([label, val]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="flex-shrink-0">{label}</span>
                    <span className="text-navy font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Отправить запрос</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Имя *</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Компания</label>
                  <input type="text" placeholder="ООО «Компания»" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Телефон *</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">E-mail</label>
                  <input type="email" placeholder="mail@company.ru" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Запрос / сообщение</label>
                <textarea rows={4} placeholder="Опишите нужную продукцию, количество, сроки, стандарт..." className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors resize-none" />
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Прикрепить чертёж / файл</label>
                <div className="border border-dashed border-border px-4 py-5 text-center cursor-pointer hover:border-blue-brand transition-colors">
                  <Icon name="Upload" size={18} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-ibm text-xs text-steel">PDF, DWG, DXF, STEP до 20 МБ</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-brand text-white font-oswald text-sm font-medium py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />Отправить запрос
              </button>
              <p className="font-ibm text-xs text-steel text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <span className="text-blue-brand cursor-pointer hover:underline">политикой конфиденциальности</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
