<?php

namespace App\Http\Controllers;

use App\Models\VantagemConsorcio;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VantagemConsorcioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vantagens = VantagemConsorcio::ordenadas()->get();

        return Inertia::render('Admin/Vantagens/Index', [
            'vantagens' => $vantagens,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Vantagens/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'ordem' => 'nullable|integer|min:0',
            'ativo' => 'boolean',
        ]);

        $mensagem = 'Vantagem criada com sucesso!';
        $tipoMensagem = 'success';

        // Se não informar ordem, pega a próxima disponível
        if (!isset($validated['ordem']) || $validated['ordem'] === '') {
            $validated['ordem'] = VantagemConsorcio::max('ordem') + 1;
        } else {
            // Verifica se a ordem já existe
            $ordemExistente = VantagemConsorcio::where('ordem', $validated['ordem'])->exists();

            if ($ordemExistente) {
                // Se a ordem já existe, cria como inativa e informa
                $validated['ativo'] = false;
                $mensagem = "Vantagem criada com sucesso! Como a ordem {$validated['ordem']} já existe, ela foi criada como inativa.";
                $tipoMensagem = 'warning';
            }
        }

        VantagemConsorcio::create($validated);

        return redirect()->route('admin.vantagens.index')
            ->with($tipoMensagem, $mensagem);
    }

    /**
     * Display the specified resource.
     */
    public function show(VantagemConsorcio $vantagem)
    {
        return Inertia::render('Admin/Vantagens/Show', [
            'vantagem' => $vantagem,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VantagemConsorcio $vantagem)
    {
        return Inertia::render('Admin/Vantagens/Edit', [
            'vantagem' => $vantagem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VantagemConsorcio $vantagem)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'ordem' => 'nullable|integer|min:0',
            'ativo' => 'boolean',
        ]);

        $mensagem = 'Vantagem atualizada com sucesso!';
        $tipoMensagem = 'success';

        // Verifica se a ordem já existe (excluindo a própria vantagem)
        if (isset($validated['ordem']) && $validated['ordem'] !== '') {
            $ordemExistente = VantagemConsorcio::where('ordem', $validated['ordem'])
                ->where('id', '!=', $vantagem->id)
                ->exists();

            if ($ordemExistente) {
                // Se a ordem já existe, atualiza como inativa e informa
                $validated['ativo'] = false;
                $mensagem = "Vantagem atualizada com sucesso! Como a ordem {$validated['ordem']} já existe, ela foi definida como inativa.";
                $tipoMensagem = 'warning';
            }
        }

        $vantagem->update($validated);

        return redirect()->route('admin.vantagens.index')
            ->with($tipoMensagem, $mensagem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VantagemConsorcio $vantagem)
    {
        $vantagem->delete();

        return redirect()->route('admin.vantagens.index')
            ->with('success', 'Vantagem excluída com sucesso!');
    }

    /**
     * Toggle ativo/inativo
     */
    public function toggleAtivo(VantagemConsorcio $vantagem)
    {
        $vantagem->update(['ativo' => !$vantagem->ativo]);

        return redirect()->route('admin.vantagens.index')
            ->with('success', 'Status da vantagem alterado com sucesso!');
    }

    /**
     * API para buscar vantagens ativas (para a calculadora)
     */
    public function getVantagensAtivas()
    {
        $vantagens = VantagemConsorcio::ativas()->ordenadas()->get();

        return response()->json($vantagens);
    }
}
