# SOLID    
 ## Co to jest ? To zbiór pięciu zasad, które definiują, w jaki sposób powinien być budowany, rozwijany i utrzymywany projekt od strony kodu. Korzystając z tych zasad kod,     
który powstanie nie powinien przypominać plątaniny przewodów podłączonych do bomby, która wybuchnie jeżeli usuniemy niewłaściwy przewód.    
    
## Przykładowa aplikacja 
Aby w przystępny sposób zaprezentować dlaczego warto stosować zasady SOLID stworzyłem prostą aplikację, w której zaprezentowałem różnice między kodem, w który nie uwzględniono tych zasad a kodem korzystającym z nich w prawidłowy sposób.  
Przyjmijmy, że tworzymy system przeznaczony dla pracowników uczelni wyższej, który ma być odpowiedzialny za tworzenie raportów na temat wyników studentów oraz komunikacji z nimi.  
    
## S: Single Responsibility Principle(SRP) 
>*Klasy i metody powinny być odpowiedzialne tylko za jedną rzecz oraz powinna istnieć tylko jeden powód aby je zmieniać*    

SRP wymaga, aby klasa miała tylko jeden powód do zmiany. Klasa zgodna z tą zasadą wykonuje tylko kilka powiązanych zadań. Myśląc w ramach SRP, nie trzeba ograniczać się tylko do problemów powiązanych z klasami.   
Zasadę SRP można zastosować także do metod czy modułów, upewniając się, że są odpowiedzialne, tylko za jedną rzecz oraz  że mają tylko jeden powód do zmiany.  
  
**Historyjka:**  
  
Doktor Jan Kowalski zgłosił potrzebę generowania raportów z wynikami jego studentów z różnych grup, oraz możliwości przesyłania tych raportów.  
    
### Złe podejście  

```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    public generateAndSendReport(email: string, type: ReportType): Promise<void> {
        const preparedReport: HTMLElement = this.formatReport(type);
        void SaveFileService.saveFile(preparedReport);
        void UniversityEmailService.sendEmail(email, preparedReport);
        return Promise.resolve();
    }
}  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3enk9PYIM7pEnH61XJx8Xe5hk5gqiN8H9m1BJpr6xYTbImF0lSpJlwUa4yqcpXs9jVid-fv9vSk0FuJFAAjjnJY9Exb2rYenZXOBhjKcplAc1XYcpwxTmhfGw9wXMUGnD70gsmIDjo03-eLmFVehrE=w978-h452-no" alt="StudentsServiceBadUNL"/>  
</p>  
  
>Diagram UML
  
Powyższa klasa nie stosuje zasad SOLID i ma parę błędów, które poniżej wypunktuję:  
 - ```generateReport``` → nie jest odpowiedzialny tylko za generowanie raportów, ale również za automatyczne wysyłanie tych raportów e-mailem. Jest to słabe rozwiązanie, ponieważ, jeżeli osoba generująca raportu ustawi sobie jakąś regułę, która będzie automatycznie generować raport dla wszystkich grup studentów (powiedzmy cyklicznie codziennie), wtedy prawdopodobnie zawalimy komuś skrzynkę, a może nawet wyślemy dane, które nie powinny być wysłane.  
  
### Dobre podejście  
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}

const studentsReport: StudentsReport = new StudentsReport([]);
const report: HTMLElement = studentsReport.getReport(ReportType.DEAN);
void GenerateReportService.generateReport('./path', report);
void UniversityEmailService.sendEmail('test@test.pl', report);  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3dbx9-v_6iKPjbEM_xo1spz1gz337peoTMsVN0_CpKU948AbBrzD0r6rbrWuFgCm-1o_DXGcg7yChZPxYqPN4yWnPE3BWmPAgyhiIgM6fvuL_Mo1yEdFDzqhKxfyP8tM4SoFn9h8TMb3WIglGyL2pM=w874-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML
  
Po refaktoryzacji możemy zauważyć, że **StudentsReport** odpowiada w tym momencie tylko za utworzenie odpowiednio sformatowanego raportu, który zostanie utworzony przez jeden z formaterów. Może i metoda odpowiadająca za formatowanie składa się z wielu ifów, ale odpowiada tylko za jedną rzecz, mianowicie formatowanie raportu. Generowanie raportu na dysk oraz wysyłanie raportu jest realizowane przez dwie niezależne od siebie klasy. Takie klasy są teraz odpowiedzialne tylko za jedną rzecz oraz mają tylko jeden powód do zmiany  
  
## O: Open-Closed Principle(OCP) 
>*Elementy oprogramowania powinny być otwarte na rozszerzanie ale zamknięte na modyfikacje*    

Ryzyko zmiany istniejącej klasy polega na tym, że możemy nieumyślnie wprowadzić zmianę w logice oraz zachowaniu klasy. Rozwiązaniem tego problemu jest stworzenie klasy,    
która przesłoni logikę działania oryginalnej klasy. Wykorzystując tę zasadę, będzie znacznie łatwiej utrzymywać napisany kod (nieoczekiwane zmiany w logice, bugi...) oraz reużywać  już raz stworzonego kodu.    

### Złe podejscie
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}
```
>Kod

<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fVMjoYFjKMSZkB5LyF_myvg80NCxUYcJyjdlXWRa9gbiW3UoneiT_SiV-7WIA9UxFulmJf8ih1r_SRooTFhpjgH8Vap0j_YpdD3h2zMuwPYwNyyVLZQQD250FDDWCmPIT_GcQxRPoWL2b8__5t71Ii=w512-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML

Podejście to ma parę wad, które wymienię poniżej:  
 - ```formatReport``` → formatuje raport w zależności, dla kogo ma być on stworzony. Co w wypadku gdy będziemy chcieli dodać raport dla studenta lub innych użytkowników? Funkcja wraz z całą klasą urośnie, do ogromnych rozmiarów, co przyczyni się do tego, że kod będzie trudny w czytaniu, ciężko będzie się go utrzymywać i testować.  Ponadto zmiany w tej jednej funkcji, mogą mieć wpływ na całą klasę, z czym wiąże się prawdopodobne wygenerowanie błędów.

### Dobre podejście  
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        const reportFormatter: AbstractReportFormatterService = ReportFormatterFactory.getReportFormatter(type);
        return reportFormatter.formatReport();
    }
}  
  
class ReportFormatterFactory {
    public static getReportFormatter(type: ReportType): DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService {
        let formatterService: DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService(type);
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService(type);
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(type);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3ddk7G7AiWLy2jQdIJVKuQHgGU4pxJwmytYnuMeSwFQVBIp7ZI_syPEkivjoK7yNKbXWt9tpxTE4VQoKQpBkIfM968pSK9SOOTMA5R3TzIylGVU_48xso9Tvjr_mg1sxMNBLZeFtUVoh0CE-J9Xozbw=w928-h452-no" alt="StudentsServiceGoodUNL"/> 
</p>   

>Diagram UML  
  
Każdy formatter otrzymał swoją własną klasę, dzięki czemu jeżeli powstanie jakiś nowy typ użytkownika to wystarczy dla niego utworzyć nową klasę i dodać przypadek w fabryce.

## L: Liskov Substitution Principle (LSP) 
>*Klasy potomne nigdy nie powinny łamać definicji typów klas nadrzędnych*    

Klasa dziedzicząca z klasy podstawowej powinna jedynie rozszerzać funkcjonalność (subklasa nie powinna modyfikować zachowania klasy podstawowej np.: ilość przyjmowanych argumentów konstruktora / funkcji) klasy bazowej oraz zwracać ten sam typ danych. Oznacza to, że w miejscu klasy bazowej powinniśmy być w stanie skorzystać z dowolnej klasy po niej dziedziczącej.    
 
### Złe podejście
```typescript
class ReportFormatterFactory {
    public static getReportFormatter(type: ReportType): DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService {
        let formatterService: DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService(type);
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService(type);
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(type);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3e2z4GrpzfKG6atMT0bKIEnJY0fJTKhuy_3EpiYqxhs35IIqz0BV5teRGKz_NYPWnxwWET3H-VZICfDs4-SfBAWAs-n7RGbsHG37Rdy_TmeWM7Ph5A2et6L-KoU2nKJACN0T23NNUpulIFa4GaQdmCx=w1008-h412-no" alt="StudentsServiceGoodUNL"/> 
</p>  

>Diagram UML

Po przeanalizowaniu kodu możemy zauważyć, że każdy z formatterów ma swój osobny typ i nie są ze sobą powiązane, czyli nie możemy skorzystać z innego formattera w miejscu, w którym już na jakiś się zdecydowaliśmy

### Dobre podejście
```typescript
class ReportFormatterFactory {
    public static getReportFormatter(type: ReportType): IHandleFormatterService {
        let formatterService: IHandleFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService(type);
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService(type);
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(type);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}

abstract class AbstractReportFormatterService implements IHandleFormatterService {
    private reportType: ReportType;

    public abstract formatReport(): HTMLElement;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}

class DeanReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fzI3oRG62svsOAVa6K53NwC_6r-MAymZwCYANYQvX6PE1tUlv6kFfhFt62GRMGSWnI-eK5lUG0WVh72BnVWdcbyif7muSMNkaMFW3yzVmhqcffEzDUAvi-kZivdmcihm-GNZat1k_FotxmfP2SHSny=w1146-h452-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Utworzona wspólna klasa abstrakcyjna, w której można zawrzeć powtarzającą się logikę oraz dodatkowo zapewniliśmy, to każdy formatter może być podmieniony przez inny, który także dziedziczy po **AbstractReportFormatterService**
    
## I: Interface Segregation Principle (ISP)
>*Użytkownik nie powinien musieć polegać na interfejsacg, których nie używa*   
 
Często jest tak, że interfejs jest opisem całej klasy. ISP to zasada, która mówi, że klasa powinna być opisana szeregiem mniejszych interfejsów (bardziej szczegółowych odpowiedzialnych tylko za jedną rzecz SRP),     
które udostępniają tylko niektóre zasoby klasy zamiast całej jej zawartości w jednym miejscu.

**Historyjka:** 
Doktor Jan Kowalski zgłosił potrzebę aktualizacji raportów dla pojedynczych studentów oraz grup.

### Złe podejście

```typescript
interface IHandleFormatterService {
    formatReport(report: Map<number, Student>): HTMLElement;
    updateReport(indexes: number[]): void;
}

abstract class AbstractReportFormatterService implements IHandleFormatterService{
    private reportType: ReportType;

    protected formattedReport: HTMLElement;

    public abstract formatReport(report: Map<number, Student>): HTMLElement;
    public abstract updateReport(indexes: number[]): void;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}

class UniversityWorkerReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(report: Map<number, Student>): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }

    public updateReport(indexes: number[]): void {
        // update report logic
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fjSIIyUVdgPTJIlJ77XIv9v0P0oUtQFr3-4wc0SG3HtyCq6ReZjBx80einuEtJ-_ghg7AApLG-fJJiTkFX7ps_GIpx_INbQJFtS93HlFrHaukxscBq10mlTE5kCPyGULFtnE8FPY8IHx47xEHKKXK6=w751-h412-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Nie powinniśmy rozszerzać głównego interfejsu, z którego korzysta każda grupa użytkowników, ponieważ:  
 - Za każdym razem gdy dołożymy kolejny element do interfejsu ```IHandleFormatterService```, będziemy musieli go zaimplementować w każdej klasie, która go implementuje (co najwyżej jeżeli będzie to element opcjonalny), a niekoniecznie go potrzebuje
 - ```updateReport``` nie powinno być dostępnie dla pani sekretarki, które pracuje na uczelni, ponieważ nie powinna ingerować w raporty studentów podległych jakiemuś doktorow
 ### Dobre podejście
 ```typescript
type IHandleFormatterService = IDeanFormatterService | ILecturerFormatterService | IUniversityWorkerService;
interface IBaseFormatterService {
    formatReport(report: Map<number, Student>): HTMLElement;
}
interface IDeanFormatterService extends IBaseFormatterService { }
interface ILecturerFormatterService extends IBaseFormatterService {
    updateReport(indexes: number[]): void;
}
interface IUniversityWorkerService extends IBaseFormatterService { }

abstract class AbstractReportFormatterService implements IBaseFormatterService {
    private reportType: ReportType;

    protected formattedReport: HTMLElement;

    public abstract formatReport(report: Map<number, Student>): HTMLElement;

    constructor(reportType: ReportType) {
        this.reportType = reportType;
    }
}

export class LecturerReportFormatterService extends AbstractReportFormatterService implements ILecturerFormatterService {
    public formatReport(report: Map<number, Student>): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }


    public updateReport(indexes: number[]): void {
        // update report logic
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3e4z9hbOEQ-69q_Mtg8D9XmlY3XMAvKpAgPI70ks6mVKl1JsxGErEtE49NKDFc46Vp_iNsy3MuQGUPuEkgExxz1UEE-aqVPL-8b5npCSvmpcfw_LomzS69gQ9Q-ifIhK9wuqnDs49vqFEwXI2dhQJAr=w751-h412-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Interfejs ```IHandleFormatterService``` stał się typem union, który jest zbiorem interfejsów. Każdy typ użytkownika ma swój własny interfejs, dzięki czemu jeżeli trzeba dołożyć jakąś funkcjonalność / pole dla tylko jednej grupy użytkowników to wystarczy zrobić to tylko dla nich, a nie dla wszystkich. Dodatkowo wyodrębniliśmy wspólny interfejs, który zawiera deklarację implementacji metody ```formatReport```, która jest wspólna dla wszystkich typów użytkowników i każdy musi ją zaimplementować.

## D: Dependency Inversion Principle (DIP) 
>*Abstrakcja nie powinna zależeć od detali. Detale powinny zależeć od abstrakcji*   
 
Abstrakcja lub moduł niższego poziomu nie powinien być zależny od klas czy modułów wyższego poziomu, ponieważ zmiany, które będą wymagane do wprowadzenia w bardziej wysokopoziomowej klasie prawdopodbnie    
będą miały wpływ na niskopoziomową klasę / moduł, przez co wymagane będą zmiany w klasach / modułach, które korzystają te bardziej niskopoziomową
